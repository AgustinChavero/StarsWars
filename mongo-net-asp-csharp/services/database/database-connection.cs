using MongoDB.Driver;

namespace csharp_asp.services.database
{
    public class DatabaseConnection<T>
    {
        private readonly IMongoCollection<T> _collection;

        public DatabaseConnection(IConfiguration configuration, string collectionName)
        {
            var connectionString = configuration.GetSection("Connection:DataBase").Value;
            var databaseName = configuration.GetSection("Connection:DataBaseName").Value;

            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase(databaseName);
            _collection = database.GetCollection<T>(collectionName);
        }

        public IMongoCollection<T> GetCollection()
        {
            return _collection;
        }
    }
}





