using MongoDB.Bson;

namespace csharp_asp.modules.starship
{
    public class Starship : IStarship
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public string? Model { get; set; }
        public string? Manufacturer { get; set; }
        public string? CostInCredits { get; set; }
        public string? Length { get; set; }
        public string? MaxAtmospheringSpeed { get; set; }
        public string? Crew { get; set; }
        public string? Passengers { get; set; }
        public string? CargoCapacity { get; set; }
        public string? Consumables { get; set; }
        public string? StarshipClass { get; set; }
        public int HyperdriveRating { get; set; }
        public int MGLT { get; set; }
        public List<string>? Pilots { get; set; }
        public List<string>? Films { get; set; }
        public Boolean IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Starship()
        {
            _id = ObjectId.GenerateNewId().ToString();
            Name = "NewStarship";
            Model = "Super";
            Manufacturer = "AgustinChavero";
            CostInCredits = "100000000000";
            Length = "400";
            MaxAtmospheringSpeed = "9999999999";
            Crew = "8";
            Passengers = "16";
            CargoCapacity = "40";
            Consumables = "All";
            StarshipClass = "Premium";
            HyperdriveRating = 9999999;
            MGLT = 30;
            IsDeleted = false;
        }
    }
}
