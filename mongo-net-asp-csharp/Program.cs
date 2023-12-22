using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using csharp_asp.modules.film;
using csharp_asp.services.database;
using Microsoft.Extensions.Configuration;
using csharp_asp.services.functions;
using csharp_asp.modules.people;
using csharp_asp.modules.planet;
using csharp_asp.modules.starship;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddControllers();

builder.Services.AddScoped(provider =>
{
    var collectionName = "Film";
    return new GlobalFunctions<Film>(configuration, collectionName);
});

builder.Services.AddScoped(provider =>
{
    var collectionName = "Planet";
    return new GlobalFunctions<Planet>(configuration, collectionName);
});

builder.Services.AddScoped(provider =>
{
    var collectionName = "Starship";
    return new GlobalFunctions<Starship>(configuration, collectionName);
});

builder.Services.AddScoped(provider =>
{
    var collectionName = "People";
    return new GlobalFunctions<People>(configuration, collectionName);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllersWithViews();
builder.Services.AddMvc();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
