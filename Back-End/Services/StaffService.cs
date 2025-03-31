// StaffService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class StaffService : IStaffService
{
    private readonly PawPalsDbContext _context;

    public StaffService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<StaffListDto> GetAllStaff()
    {
        var doctors = await _context.Doctors
            .Select(d => new DoctorDto
            {
                DoctorId = d.DoctorId,
                FirstName = d.FirstName,
                LastName = d.LastName,
                Email = d.Email,
                Specialty = d.Specialty
            })
            .ToListAsync();

        var groomers = await _context.Groomers
            .Select(g => new GroomerDto
            {
                GroomerId = g.GroomerId,
                FirstName = g.FirstName,
                LastName = g.LastName,
                Email = g.Email
            })
            .ToListAsync();

        var receptionists = await _context.Receptionists
            .Select(r => new ReceptionistDto
            {
                ReceptionistId = r.ReceptionistId,
                FirstName = r.FirstName,
                LastName = r.LastName,
                Email = r.Email,
                Qualification = r.Qualification
            })
            .ToListAsync();

        return new StaffListDto
        {
            Doctors = doctors,
            Groomers = groomers,
            Receptionists = receptionists
        };
    }
    public async Task<StaffListDto> SearchStaff(StaffSearchDto searchDto)
    {
        var result = new StaffListDto();

        // Check if we're searching specific role or all roles
        bool searchAllRoles = string.IsNullOrEmpty(searchDto.Role);

        // Try to parse search word as ID
        bool isIdSearch = int.TryParse(searchDto.SearchWord, out int searchId);

        if (searchAllRoles || searchDto.Role == "Doctor")
        {
            result.Doctors = await SearchDoctors(searchDto.SearchWord, isIdSearch, searchId);
        }

        if (searchAllRoles || searchDto.Role == "Groomer")
        {
            result.Groomers = await SearchGroomers(searchDto.SearchWord, isIdSearch, searchId);
        }

        if (searchAllRoles || searchDto.Role == "Receptionist")
        {
            result.Receptionists = await SearchReceptionists(searchDto.SearchWord, isIdSearch, searchId);
        }

        return result;
    }

    private async Task<List<DoctorDto>> SearchDoctors(string searchWord, bool isIdSearch, int searchId)
    {
        var query = _context.Doctors.AsQueryable();

        if (isIdSearch)
        {
            query = query.Where(d => d.DoctorId == searchId);
        }
        else
        {
            query = query.Where(d =>
                d.FirstName.Contains(searchWord) ||
                d.LastName.Contains(searchWord));
        }

        return await query.Select(d => new DoctorDto
        {
            DoctorId = d.DoctorId,
            FirstName = d.FirstName,
            LastName = d.LastName,
            Email = d.Email,
            Specialty = d.Specialty
        }).ToListAsync();
    }

    private async Task<List<GroomerDto>> SearchGroomers(string searchWord, bool isIdSearch, int searchId)
    {
        var query = _context.Groomers.AsQueryable();

        if (isIdSearch)
        {
            query = query.Where(g => g.GroomerId == searchId);
        }
        else
        {
            query = query.Where(g =>
                g.FirstName.Contains(searchWord) ||
                g.LastName.Contains(searchWord));
        }

        return await query.Select(g => new GroomerDto
        {
            GroomerId = g.GroomerId,
            FirstName = g.FirstName,
            LastName = g.LastName,
            Email = g.Email
        }).ToListAsync();
    }

    private async Task<List<ReceptionistDto>> SearchReceptionists(string searchWord, bool isIdSearch, int searchId)
    {
        var query = _context.Receptionists.AsQueryable();

        if (isIdSearch)
        {
            query = query.Where(r => r.ReceptionistId == searchId);
        }
        else
        {
            query = query.Where(r =>
                r.FirstName.Contains(searchWord) ||
                r.LastName.Contains(searchWord));
        }

        return await query.Select(r => new ReceptionistDto
        {
            ReceptionistId = r.ReceptionistId,
            FirstName = r.FirstName,
            LastName = r.LastName,
            Email = r.Email,
            Qualification = r.Qualification
        }).ToListAsync();
    }
}