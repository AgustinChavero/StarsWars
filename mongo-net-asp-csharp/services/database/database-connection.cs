using MongoDB.Driver;
using System;

namespace csharp_asp.services.database
{
    public class DatabaseConnection<T>
    {
        private readonly IMongoCollection<T> _collection;

        public DatabaseConnection(string connectionString, string collectionName)
        {
            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase("CsharpStarwars");
            _collection = database.GetCollection<T>(collectionName);
        }

        public IMongoCollection<T> GetCollection()
        {
            return _collection;
        }
    }
}




