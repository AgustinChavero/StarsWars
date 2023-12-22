using csharp_asp.services.database;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace csharp_asp.services.functions
{
    public interface IEntityService<T>
    {
        Task<T> CreateElement(object body, string model);
        Task<T> FindElement(ObjectId id, string model);
        Task<List<T>> FindAllElement(Dictionary<string, object> query, string model);
        Task<T> UpdateElement(ObjectId id, object body, string model);
        Task<T> DeleteElement(ObjectId id, string model);
    }
    public class GlobalFunctions<T> : IEntityService<T>
    {
        private readonly IMongoCollection<T> _collection;

        public GlobalFunctions(IConfiguration configuration, string collectionName)
        {
            var connectionString = configuration.GetSection("Connection:DataBase").Value;
            var databaseName = configuration.GetSection("Connection:DataBaseName").Value;

            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase(databaseName);
            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<T> CreateElement(object body, string model)
        {
            if (body == null) throw new InvalidOperationException("CreateElement necesita un cuerpo");

            if (string.IsNullOrEmpty(model)) throw new InvalidOperationException("CreateElement necesita un nombre de modelo");

            var modelType = Type.GetType(model);
            if (modelType == null || !typeof(T).IsAssignableFrom(modelType)) throw new InvalidOperationException($"El modelo '{model}' no es compatible con el tipo '{typeof(T)}'.");

            var document = (T)Activator.CreateInstance(modelType);

            foreach (var prop in modelType.GetProperties())
            {
                if (prop.Name != "_id")
                {
                    var value = body.GetType().GetProperty(prop.Name)?.GetValue(body, null);
                    prop.SetValue(document, value);
                }
            }

            await _collection.InsertOneAsync(document);
            return document;
        }

        public async Task<T> FindElement(ObjectId id, string model)
        {
            var filter = Builders<T>.Filter.Eq("_id", id);

            var result = await _collection.Find(filter).FirstOrDefaultAsync();

            return result;
        }

        public async Task<List<T>> FindAllElement(Dictionary<string, object> query, string model)
        {
            var filterBuilder = Builders<T>.Filter;
            var filter = filterBuilder.Empty;

            if (query != null && query.Count > 0)
            {
                foreach (var item in query)
                {
                    filter &= filterBuilder.Eq(item.Key, item.Value);
                }
            }

            var result = await _collection.Find(filter).ToListAsync();
            return result;
        }

        public async Task<T> UpdateElement(ObjectId id, object body, string model)
        {
            if (body == null) throw new InvalidOperationException("UpdateElement necesita un cuerpo");

            if (string.IsNullOrEmpty(model)) throw new InvalidOperationException("UpdateElement necesita un nombre de modelo");

            var filter = Builders<T>.Filter.Eq("_id", id);

            var updateDefinition = Builders<T>.Update
                .Set("UpdatedAt", DateTime.UtcNow);

            var properties = body.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(body);

                if (propertyValue != null && propertyName != "_id" && propertyName != "CreatedAt")
                {
                    updateDefinition = updateDefinition.Set(propertyName, propertyValue);
                }
            }

            await _collection.UpdateOneAsync(filter, updateDefinition);

            var updatedElement = await _collection.Find(filter).FirstOrDefaultAsync();
            return updatedElement;
        }


        public async Task<T> DeleteElement(ObjectId id, string model)
        {
            if (string.IsNullOrEmpty(model)) throw new InvalidOperationException("DeleteElement necesita un nombre de modelo");

            var filter = Builders<T>.Filter.Eq("_id", id);
            var updateDefinition = Builders<T>.Update.Set("IsDeleted", true);

            await _collection.UpdateOneAsync(filter, updateDefinition);

            var updatedElement = await _collection.Find(filter).FirstOrDefaultAsync();
            return updatedElement;
        }
    }
}

