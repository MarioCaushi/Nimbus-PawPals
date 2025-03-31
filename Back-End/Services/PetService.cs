// PetService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class PetService : IPetService
{
    private readonly PawPalsDbContext _context;

    public PetService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<List<PetDto>> GetAllPets()
    {
        return await _context.Pets
            .Include(p => p.Client)
            .OrderBy(p => p.Name)
            .Select(p => new PetDto
            {
                PetId = p.PetId,
                Name = p.Name,
                Birthday = p.Birthday,
                Species = p.Species,
                Breed = p.Breed,
                Color = p.Color,
                Gender = p.Gender,
                Weight = p.Weight,
                AllergyInfo = p.AllergyInfo,
                SpecialNeed = p.SpecialNeed,
                Castrated = p.Castrated,
                HealthStatus = p.HealthStatus,
                RegisterDate = p.RegisterDate,
                ClientId = p.ClientId,
                ClientName = $"{p.Client.FirstName} {p.Client.LastName}"
            })
            .ToListAsync();
    }
}