using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using csharp_asp.modules.film;
using csharp_asp.services.database;
using csharp_asp.services.functions;

var builder = WebApplication.CreateBuilder(args);

// Registra los controladores y las dependencias personalizadas.
builder.Services.AddControllers();

builder.Services.AddScoped(provider =>
{
    var connectionString = "mongodb+srv://agustindanielchavero:39843562@cluster0.ysao6ts.mongodb.net/";
    var collectionName = "Film";
    return new GlobalFunctions<Film>(connectionString, collectionName);
});

// Añade soporte para Swagger/OpenAPI.
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












