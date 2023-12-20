namespace csharp_asp.modules.film
{
    public interface IFilm
    {
        string _id {get; set;}
        string Title { get; set; }
        int? EpisodeId { get; set; }
        string? OpeningCrawl { get; set; }
        string? Director { get; set; }
        string? Producer { get; set; }
        string? ReleaseDate { get; set; }
        List<string>? Characters { get; set; }
        List<string>? Planets { get; set; }
        List<string>? Starships { get; set; }
        List<string>? Vehicles { get; set; }
        List<string>? Species { get; set; }
        Boolean IsDeleted { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
