// StaffService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
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
    public async Task<string?> AddStaff(AddStaffDto staffDto)
    {
        // Check if username exists
        if (await _context.UserAuths.AnyAsync(u => u.Username == staffDto.Username))
            return "Username already exists";

        // Check if email exists in the appropriate staff table
        bool emailExists = false;
        switch (staffDto.Role.ToLower())
        {
            case "doctor":
                emailExists = await _context.Doctors.AnyAsync(d => d.Email == staffDto.Email);
                break;
            case "receptionist":
                emailExists = await _context.Receptionists.AnyAsync(r => r.Email == staffDto.Email);
                break;
            case "groomer":
                emailExists = await _context.Groomers.AnyAsync(g => g.Email == staffDto.Email);
                break;
            case "manager":
                emailExists = await _context.Managers.AnyAsync(m => m.Email == staffDto.Email);
                break;
        }

        if (emailExists)
            return "Email already exists";

    
        try
        {
            // Create the staff member based on role
            switch (staffDto.Role.ToLower())
            {
                case "doctor":
                    var doctor = new Doctor
                    {
                        PersonalId = staffDto.PersonalId,
                        FirstName = staffDto.FirstName,
                        LastName = staffDto.LastName,
                        Birthday = DateOnly.FromDateTime(staffDto.Birthday),
                        Email = staffDto.Email,
                        ContactNumber = staffDto.ContactNumber,
                        Address = staffDto.Address,
                        HireDate = DateTime.UtcNow,
                        Specialty = staffDto.Specialty ?? throw new ArgumentNullException("Specialty is required for doctors"),
                        Qualifications = staffDto.Qualification ?? throw new ArgumentNullException("Qualification is required for doctors"),
                        SalaryId = staffDto.SalaryId
                    };
                    _context.Doctors.Add(doctor);
                    await _context.SaveChangesAsync();

                    // Create user auth
                    await CreateUserAuth(doctor.DoctorId, staffDto, "doctor");
                    break;

                case "receptionist":
                    var receptionist = new Receptionist
                    {
                        PersonalId = staffDto.PersonalId,
                        FirstName = staffDto.FirstName,
                        LastName = staffDto.LastName,
                        Birthday = DateOnly.FromDateTime(staffDto.Birthday),
                        Email = staffDto.Email,
                        ContactNumber = staffDto.ContactNumber,
                        Address = staffDto.Address,
                        HireDate = DateTime.UtcNow,
                        Qualification = staffDto.Qualification ?? throw new ArgumentNullException("Qualification is required for receptionists"),
                        SalaryId = staffDto.SalaryId
                    };
                    _context.Receptionists.Add(receptionist);
                    await _context.SaveChangesAsync();

                    await CreateUserAuth(receptionist.ReceptionistId, staffDto, "receptionist");
                    break;

                case "groomer":
                    var groomer = new Groomer
                    {
                        PersonalId = staffDto.PersonalId,
                        FirstName = staffDto.FirstName,
                        LastName = staffDto.LastName,
                        Birthday = DateOnly.FromDateTime(staffDto.Birthday),
                        Email = staffDto.Email,
                        ContactNumber = staffDto.ContactNumber,
                        Address = staffDto.Address,
                        HireDate = DateTime.UtcNow,
                        SalaryId = staffDto.SalaryId
                    };
                    _context.Groomers.Add(groomer);
                    await _context.SaveChangesAsync();

                    await CreateUserAuth(groomer.GroomerId, staffDto, "groomer");
                    break;

                case "manager":
                    var manager = new Manager
                    {
                        PersonalId = staffDto.PersonalId,
                        FirstName = staffDto.FirstName,
                        LastName = staffDto.LastName,
                        Birthday = DateOnly.FromDateTime(staffDto.Birthday),
                        Email = staffDto.Email,
                        ContactNumber = staffDto.ContactNumber,
                        Address = staffDto.Address,
                        HireDate = DateTime.UtcNow,
                        SalaryId = staffDto.SalaryId
                    };
                    _context.Managers.Add(manager);
                    await _context.SaveChangesAsync();

                    await CreateUserAuth(manager.ManagerId, staffDto, "manager");
                    break;

                default:
                    return "Invalid role specified";
            }

            return null; // Success
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            return ex.Message;
        }
    }

    private async Task CreateUserAuth(int staffId, AddStaffDto staffDto, string role)
    {
        var userAuth = new UserAuth
        {
            Username = staffDto.Username,
            Password = staffDto.Password, // Storing plain text (NOT RECOMMENDED)
            Role = role
        };

        // Set the appropriate foreign key
        switch (role.ToLower())
        {
            case "doctor":
                userAuth.DoctorId = staffId;
                break;
            case "receptionist":
                userAuth.ReceptionistId = staffId;
                break;
            case "groomer":
                userAuth.GroomerId = staffId;
                break;
            case "manager":
                userAuth.ManagerId = staffId;
                break;
        }

        _context.UserAuths.Add(userAuth);
        await _context.SaveChangesAsync();
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
        var normalizedSearch = searchWord.ToLower().Trim();

        if (isIdSearch)
        {
            query = query.Where(d => d.DoctorId == searchId);
        }
        else
        {
            query = query.Where(d =>
                d.FirstName.ToLower().Trim().Contains(normalizedSearch) ||
                d.LastName.ToLower().Trim().Contains(normalizedSearch));
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
        var normalizedSearch = searchWord.ToLower().Trim();

        if (isIdSearch)
        {
            query = query.Where(g => g.GroomerId == searchId);
        }
        else
        {
            query = query.Where(g =>
                g.FirstName.ToLower().Trim().Contains(normalizedSearch) ||
                g.LastName.ToLower().Trim().Contains(normalizedSearch));
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
        var normalizedSearch = searchWord.ToLower().Trim();

        if (isIdSearch)
        {
            query = query.Where(r => r.ReceptionistId == searchId);
        }
        else
        {
            query = query.Where(r =>
                r.FirstName.ToLower().Trim().Contains(normalizedSearch) ||
                r.LastName.ToLower().Trim().Contains(normalizedSearch));
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
    
    public async Task<List<SalaryInfoDto>> GetAllSalaryOptions()
    {
        var salaries = await _context.Salaries
            .Include(s => s.Doctors)
            .Include(s => s.Groomers)
            .Include(s => s.Managers)
            .Include(s => s.Receptionists)
            .ToListAsync();

        var result = new List<SalaryInfoDto>();

        foreach (var s in salaries)
        {
            if (s.Doctors.Any())
            {
                foreach (var doc in s.Doctors)
                {
                    result.Add(new SalaryInfoDto
                    {
                        SalaryId = s.SalaryId,
                        BaseSalary = s.BaseSalary,
                        OvertimeRate = s.OvertimeRate,
                        PayCycle = s.PayCycle,
                        Role = "Doctor",
                        Specialty = doc.Specialty
                    });
                }
            }

            if (s.Groomers.Any())
            {
                result.Add(new SalaryInfoDto
                {
                    SalaryId = s.SalaryId,
                    BaseSalary = s.BaseSalary,
                    OvertimeRate = s.OvertimeRate,
                    PayCycle = s.PayCycle,
                    Role = "Groomer"
                });
            }

            if (s.Receptionists.Any())
            {
                result.Add(new SalaryInfoDto
                {
                    SalaryId = s.SalaryId,
                    BaseSalary = s.BaseSalary,
                    OvertimeRate = s.OvertimeRate,
                    PayCycle = s.PayCycle,
                    Role = "Receptionist"
                });
            }

            if (s.Managers.Any())
            {
                result.Add(new SalaryInfoDto
                {
                    SalaryId = s.SalaryId,
                    BaseSalary = s.BaseSalary,
                    OvertimeRate = s.OvertimeRate,
                    PayCycle = s.PayCycle,
                    Role = "Manager"
                });
            }
        }

        return result;
    }


}