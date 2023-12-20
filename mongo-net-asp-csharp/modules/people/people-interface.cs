namespace csharp_asp.modules.people
{
    public interface IPeople
    {
        string _id { get; set; }
        string Name { get; set; }
        int? Height { get; set; }
        string? Mass { get; set; }
        string? HairColor { get; set; }
        string? SkinColor { get; set; }
        string? EyeColor { get; set; }
        string? BirthYear { get; set; }
        string? Gender { get; set; }
        string? Homeworld { get; set; }
        List<string>? Films { get; set; }
        List<string>? Species { get; set; }
        List<string>? Vehicles { get; set; }
        List<string>? Starships { get; set; }
        Boolean IsDeleted { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
