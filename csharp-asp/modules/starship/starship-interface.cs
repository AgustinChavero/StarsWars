namespace csharp_asp.modules.starship
{
    public interface IStarship
    {
        string _id { get; set; }
        string Name { get; set; }
        string? Model { get; set; }
        string? Manufacturer { get; set; }
        string? CostInCredits { get; set; }
        string? Length { get; set; }
        string? MaxAtmospheringSpeed { get; set; }
        string? Crew { get; set; }
        string? Passengers { get; set; }
        string? CargoCapacity { get; set; }
        string? Consumables { get; set; }
        string? StarshipClass { get; set; }
        int HyperdriveRating { get; set; }
        int MGLT { get; set; }
        List<string>? Pilots { get; set; }
        List<string>? Films { get; set; }
        Boolean IsDeleted { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
