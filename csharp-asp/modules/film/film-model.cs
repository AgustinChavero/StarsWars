using MongoDB.Bson;

namespace csharp_asp.modules.film
{
    public class Film: IFilm
    {
        public string _id { get; set; }
        public string Title { get; set; } 
        public int? EpisodeId { get; set; }
        public string? OpeningCrawl { get; set; }
        public string? Director { get; set; }
        public string? Producer { get; set; } 
        public string? ReleaseDate { get; set; }
        public List<string>? Characters { get; set; }
        public List<string>? Planets { get; set; }
        public List<string>? Starships { get; set; }
        public List<string>? Vehicles { get; set; }
        public List<string>? Species { get; set; }
        public Boolean IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Film()
        {
            _id = ObjectId.GenerateNewId().ToString();
            Title = "NewFilm";
            EpisodeId = 1;
            OpeningCrawl = "SuperOpening";
            Director = "Agustin Chavero";
            Producer = "Agustin Chavero";
            IsDeleted = false;
            ReleaseDate = DateTime.Now.ToString();
        }
    }
}
