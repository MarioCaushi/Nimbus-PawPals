using Back_End.Data;
using Back_End.Services;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using static Back_End.Errors.ExceptionsMiddlewareExtensions;

var builder = WebApplication.CreateBuilder(args);

// Manually load .env file
LoadEnvVariables();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

// Database Configuration
var configuration = builder.Configuration;
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD") ?? throw new InvalidOperationException("MYSQL_PASSWORD not set.");

var connectionString = configuration.GetConnectionString("DefaultConnection") 
    ?? throw new InvalidOperationException("Database connection string missing.");
connectionString = connectionString.Replace("${MYSQL_PASSWORD}", password);

builder.Services.AddDbContext<PawPalsDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(9, 1, 0))
));

// Register Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IExample, ExampleService>();
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IPetService, PetService>();
builder.Services.AddScoped<ITimetableService, TimetableService>();
builder.Services.AddScoped<ICart, CartService>();


// Swagger Configuration - Simplified without security
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "PawPals API", Version = "v1" });
});

var app = builder.Build();
app.UseRouting();

// Configure CORS - Simplified without credentials
app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

// Middleware Configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PawPals API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.ConfigureBuildInExceptionHandlers();
app.MapControllers();

app.Run();

void LoadEnvVariables()
{
    var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
    if (!File.Exists(envPath)) return;

    foreach (var line in File.ReadAllLines(envPath))
    {
        var parts = line.Split('=', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length != 2) continue;
        Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
    }
}
