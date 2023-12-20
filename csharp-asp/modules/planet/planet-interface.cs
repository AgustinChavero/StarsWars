namespace csharp_asp.modules.planet
{
    public interface IPlanet
    {
        string _id { get; set; }
        string Name { get; set; }
        string? RotationPeriod { get; set; }
        string? OrbitalPeriod { get; set; }
        string? Diameter { get; set; }
        string? Climate { get; set; }
        string? Gravity { get; set; }
        string? Terrain { get; set; }
        string? SurfaceWater { get; set; }
        string? Population { get; set; }
        List<string>? Residents { get; set; }
        List<string>? Films { get; set; }
        Boolean IsDeleted { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
