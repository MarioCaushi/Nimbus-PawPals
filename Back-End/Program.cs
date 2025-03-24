using Back_End.Data;
using Back_End.Services;
using Back_End.Services.ServicesInterface;
using WebApplication = Microsoft.AspNetCore.Builder.WebApplication;

using Microsoft.EntityFrameworkCore;
using static Back_End.Errors.ExceptionsMiddlewareExtensions;


var builder = WebApplication.CreateBuilder(args);

// Manually load .env file
LoadEnvVariables();

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();

// Retrieve the environment variable and check
var configuration = builder.Configuration;
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD") ?? throw new InvalidOperationException("The 'MYSQL_PASSWORD' environment variable is not set.");

// Retrieve and build the connection string
var connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("The 'DefaultConnection' connection string is missing in the configuration.");
connectionString = connectionString.Replace("${MYSQL_PASSWORD}", password);

// Configure the DbContext with MySQL
builder.Services.AddDbContext<PawPalsDbContext >(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(9, 1, 0)))
);

// Register the Swagger generator
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });
});

// Register the services

builder.Services.AddScoped<IExample, ExampleService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // The default is /swagger
    });
}

app.UseCors(options =>
    options.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());

app.UseHttpsRedirection();

// Exception Handling
app.ConfigureBuildInExceptionHandlers();

app.MapControllers();
app.Run();

//Function to load the content of .env file manually 
void LoadEnvVariables()
{
    var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
    if (!File.Exists(envPath))
        return;

    foreach (var line in File.ReadAllLines(envPath))
    {
        var parts = line.Split('=', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length != 2) continue;
        Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
    }
}

