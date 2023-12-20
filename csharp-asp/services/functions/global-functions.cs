
//Task<T> UpdateElement(string id, object body, T model);
//Task<List<T>> FindAllElement(T model, Dictionary<string, object> query);
//Task<T> FindElement(string id, T model);
//Task<T> DeleteElement(string id, T model);
using csharp_asp.services.database;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace csharp_asp.services.functions
{
    public interface IEntityService<T>
    {
        Task<T> CreateElement(object body, string model);
        Task<List<T>> FindAllElement(Dictionary<string, object> query, string model);
        Task<T> FindElement(ObjectId id, string model);
    }

    public class GlobalFunctions<T> : IEntityService<T>
    {
        private readonly IMongoCollection<T> _collection;

        public GlobalFunctions(string connectionString, string collectionName)
        {
            var dbConnection = new DatabaseConnection<T>(connectionString, collectionName);
            _collection = dbConnection.GetCollection();
        }

        public async Task<T> CreateElement(object body, string model)
        {
            if (body == null) throw new InvalidOperationException("CreateElement necesita un cuerpo");

            if (string.IsNullOrEmpty(model)) throw new InvalidOperationException("CreateElement necesita un nombre de modelo");

            var modelType = Type.GetType(model);
            if (modelType == null || !typeof(T).IsAssignableFrom(modelType))
                throw new InvalidOperationException($"El modelo '{model}' no es compatible con el tipo '{typeof(T)}'.");

            var document = (T)Activator.CreateInstance(modelType); // Crear una instancia del modelo

            // Copiar propiedades del body al documento, excepto _id si existe
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
            FilterDefinition<T> filter = filterBuilder.Empty;

            var result = await _collection.Find(filter).ToListAsync();
            return result;
        }

    }
}

