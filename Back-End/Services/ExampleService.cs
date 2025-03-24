using Back_End.Data;
using Back_End.Models;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class ExampleService : IExample
{
    private readonly PawPalsDbContext _context;

    public ExampleService(PawPalsDbContext context)
    {
        _context = context;
    }
    
    // Method to get all the managers - Example
    public async Task<List<Manager>> getAllManagers()
    {
        return await _context.Managers.ToListAsync();
    }
}