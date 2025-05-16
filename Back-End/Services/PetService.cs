// PetService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
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

    public async Task<bool> DeletePet(int petId)
    {
        var pet = await _context.Pets.FindAsync(petId);
        if (pet == null) return false;

        _context.Pets.Remove(pet);
        await _context.SaveChangesAsync();
        return true;
    }
    // Services/PetService.cs
    public async Task<List<object>> GetMedicalRecordsByPetId(int petId)
    {
        return await _context.MedicalCharts
            .Where(mc => mc.PetId == petId)
            .OrderByDescending(mc => mc.Date)
            .Select(mc => new 
            {
                medicalChartId = mc.MedicalChartId,
                description = mc.Description,
                date = mc.Date.ToString("yyyy-MM-dd"),
                petId = mc.PetId
            })
            .Cast<object>()
            .ToListAsync();
    }
    public async Task<List<object>> GetAppointmentsByPetId(int petId)
    {
        var appointments = await _context.Timetables
            .Where(t => t.PetId == petId)
            .Include(t => t.Service)
            .Select(t => new
            {
                appointmentId = t.AppointmentId,
                startTime = t.StartTime.ToString("yyyy-MM-ddTHH:mm:ss"),
                endTime = t.EndTime.ToString("yyyy-MM-ddTHH:mm:ss"),
                description = t.Description,
                status = t.Status,
                petId = t.PetId,
                serviceType = t.Service.ServiceType,
                serviceName = t.Service.ServiceName
            })
            .ToListAsync();

        return appointments.Cast<object>().ToList();
    }


    public async Task<List<PetDto>> GetPetsByClientId(int clientId)
    {
        return await _context.Pets
            .Include(p => p.Client)
            .Where(p => p.ClientId == clientId)
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
    public async Task<bool> UpdatePetInfo(int petId, UpdatePetInfoDto updatedInfo)
    {
        var pet = await _context.Pets.FindAsync(petId);
        if (pet == null)
            return false;

        pet.Color = updatedInfo.Color;
        pet.Gender = updatedInfo.Gender;
        pet.Birthday = updatedInfo.Birthday;
        pet.Weight = updatedInfo.Weight;
        pet.SpecialNeed = updatedInfo.SpecialNeed;
        pet.HealthStatus = updatedInfo.HealthStatus;
        pet.AllergyInfo = updatedInfo.AllergyInfo;
        pet.Castrated = updatedInfo.Castrated.ToLower() == "yes" ? true : false;

        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> AddPet(AddPetDto petDto)
    {
        var client = await _context.Clients.FindAsync(petDto.ClientId);
        if (client == null)
            return false;

        var newPet = new Pet
        {
            Name = petDto.Name,
            Species = petDto.Species,
            Breed = petDto.Breed,
            Color = petDto.Color,
            Gender = petDto.Gender,
            Birthday = petDto.Birthday,
            Weight = petDto.Weight,
            SpecialNeed = petDto.SpecialNeed,
            HealthStatus = petDto.HealthStatus,
            AllergyInfo = petDto.AllergyInfo,
            Castrated = petDto.Castrated.ToLower() == "yes" ? true : false,
            ClientId = petDto.ClientId,
            RegisterDate = DateTime.Now
        };

        _context.Pets.Add(newPet);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<string?> AddMedicalChart(AddMedicalChartDto dto)
    {
        var pet = await _context.Pets.FindAsync(dto.PetId);
        if (pet == null)
        {
            return "Pet not found";
        }

        var chart = new MedicalChart
        {
            Date = dto.Date,
            Description = dto.Description,
            PetId = dto.PetId
        };

        _context.MedicalCharts.Add(chart);
        await _context.SaveChangesAsync();

        return null;
    }
}