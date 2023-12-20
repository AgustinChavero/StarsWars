using MongoDB.Bson;
using System.Reflection;
using System.Security.Cryptography;

namespace csharp_asp.modules.planet
{
    public class Planet: IPlanet
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public string? RotationPeriod { get; set; }
        public string? OrbitalPeriod { get; set; }
        public string? Diameter { get; set; }
        public string? Climate { get; set; }
        public string? Gravity { get; set; }
        public string? Terrain { get; set; }
        public string? SurfaceWater { get; set; }
        public string? Population { get; set; }
        public List<string>? Residents { get; set; }
        public List<string>? Films { get; set; }
        public Boolean IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set;}

        public Planet()
        {
            _id = ObjectId.GenerateNewId().ToString();
            Name = "NewEarth";
            RotationPeriod = "365";
            OrbitalPeriod = "365";
            Diameter = "500000";
            Climate = "Tempered";
            Gravity = "10";
            Terrain = "Plain";
            SurfaceWater = "Yes";
            Population = "10000000";
            IsDeleted = false;
        }
    }
}
