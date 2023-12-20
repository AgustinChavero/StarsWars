using MongoDB.Bson;

namespace csharp_asp.modules.people
{
    public class People : IPeople
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public int? Height { get; set; }
        public string? Mass { get; set; }
        public string? HairColor { get; set; }
        public string? SkinColor { get; set; }
        public string? EyeColor { get; set; }
        public string? BirthYear { get; set; }
        public string? Gender { get; set; }
        public string? Homeworld { get; set; }
        public List<string>? Films { get; set; }
        public List<string>? Species { get; set; }
        public List<string>? Vehicles { get; set; }
        public List<string>? Starships { get; set; }
        public Boolean IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public People()
        {
            _id = ObjectId.GenerateNewId().ToString();
            Name = "Lilith";
            Height = 160;
            Mass = "60";
            HairColor = "Yellow";
            SkinColor = "White";
            EyeColor = "Blue";
            BirthYear = "2000-01-01";
            Gender = "Female";
            Homeworld = "Earth";
            IsDeleted = false;
        }
    }
}
