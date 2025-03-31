using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Back_End.Services.ServicesInterface;

namespace Back_End.Services;

public class UserService : IUserService
{
    private readonly PawPalsDbContext _context;

    public UserService(PawPalsDbContext context)
    {
        _context = context;
    }

    private async Task<StaffUserDto?> GetManager(int userId)
    {
        var manager = await _context.Managers
            .Include(m => m.UserAuths)
            .FirstOrDefaultAsync(m => m.ManagerId == userId);

        return manager == null ? null : MapToStaffUserDto(manager);
    }

    private async Task<StaffUserDto?> GetDoctor(int userId)
    {
        var doctor = await _context.Doctors
            .Include(d => d.UserAuths)
            .FirstOrDefaultAsync(d => d.DoctorId == userId);

        return doctor == null ? null : MapToStaffUserDto(doctor);
    }

    private async Task<StaffUserDto?> GetGroomer(int userId)
    {
        var groomer = await _context.Groomers
            .Include(g => g.UserAuths)
            .FirstOrDefaultAsync(g => g.GroomerId == userId);

        return groomer == null ? null : MapToStaffUserDto(groomer);
    }

    private async Task<StaffUserDto?> GetReceptionist(int userId)
    {
        var receptionist = await _context.Receptionists
            .Include(r => r.UserAuths)
            .FirstOrDefaultAsync(r => r.ReceptionistId == userId);

        return receptionist == null ? null : MapToStaffUserDto(receptionist);
    }

    private StaffUserDto MapToStaffUserDto(dynamic staff)
    {
        return new StaffUserDto
        {
            PersonalId = staff switch
            {
                Manager m => m.ManagerId,
                Doctor d => d.DoctorId,
                Groomer g => g.GroomerId,
                Receptionist r => r.ReceptionistId,
                _ => 0
            },
            Username = staff.UserAuths?.FirstOrDefault()?.Username,
            Password = staff.UserAuths?.FirstOrDefault()?.Password,
            FirstName = staff.FirstName,
            LastName = staff.LastName,
            Email = staff.Email,
            ContactNumber = staff.ContactNumber,
            Address = staff.Address,
            Birthday = staff.Birthday,
            HireDate = staff.HireDate,
            BaseSalary = staff.BaseSalary,
            PayCycle = staff.PayCycle,
            Specialty = staff.Specialty,
            Qualifications = staff.Qualifications
        };
    }

    public async Task<StaffUserDto?> GetStaffUser(int userId, string role)
    {
        if (string.IsNullOrEmpty(role)) return null;

        // Case-insensitive role handling
        return role.ToLower() switch
        {
            "manager" => await GetManager(userId),
            "doctor" => await GetDoctor(userId),
            "groomer" => await GetGroomer(userId),
            "receptionist" => await GetReceptionist(userId),
            _ => null
        };
    }

    public async Task<bool> UpdateStaffPersonalInfo(StaffUpdateDto updateDto, int userId, string role)
    {
        try
        {
            return role.ToLower() switch
            {
                "manager" => await UpdateManager(userId, updateDto),
                "doctor" => await UpdateDoctor(userId, updateDto),
                "groomer" => await UpdateGroomer(userId, updateDto),
                "receptionist" => await UpdateReceptionist(userId, updateDto),
                _ => false
            };
        }
        catch
        {
            return false;
        }
    }

    private async Task<bool> UpdateManager(int userId, StaffUpdateDto updateDto)
    {
        var manager = await _context.Managers
            .Include(m => m.UserAuths)
            .FirstOrDefaultAsync(m => m.ManagerId == userId);

        if (manager == null) return false;

        UpdateStaffCommonProperties(manager, updateDto);
        await UpdateUserAuth(manager.UserAuths.FirstOrDefault(), updateDto);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<bool> UpdateDoctor(int userId, StaffUpdateDto updateDto)
    {
        var doctor = await _context.Doctors
            .Include(d => d.UserAuths)
            .FirstOrDefaultAsync(d => d.DoctorId == userId);

        if (doctor == null) return false;

        UpdateStaffCommonProperties(doctor, updateDto);
        await UpdateUserAuth(doctor.UserAuths.FirstOrDefault(), updateDto);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<bool> UpdateGroomer(int userId, StaffUpdateDto updateDto)
    {
        var groomer = await _context.Groomers
            .Include(g => g.UserAuths)
            .FirstOrDefaultAsync(g => g.GroomerId == userId);

        if (groomer == null) return false;

        UpdateStaffCommonProperties(groomer, updateDto);
        await UpdateUserAuth(groomer.UserAuths.FirstOrDefault(), updateDto);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<bool> UpdateReceptionist(int userId, StaffUpdateDto updateDto)
    {
        var receptionist = await _context.Receptionists
            .Include(r => r.UserAuths)
            .FirstOrDefaultAsync(r => r.ReceptionistId == userId);

        if (receptionist == null) return false;

        UpdateStaffCommonProperties(receptionist, updateDto);
        await UpdateUserAuth(receptionist.UserAuths.FirstOrDefault(), updateDto);
        await _context.SaveChangesAsync();
        return true;
    }

    private void UpdateStaffCommonProperties(dynamic staff, StaffUpdateDto updateDto)
    {
        staff.FirstName = updateDto.FirstName;
        staff.LastName = updateDto.LastName;
        staff.Birthday = updateDto.Birthday;
        staff.Address = updateDto.Address;
        staff.Email = updateDto.Email;
        staff.ContactNumber = updateDto.ContactNumber;
    }

    private async Task UpdateUserAuth(UserAuth? userAuth, StaffUpdateDto updateDto)
    {
        if (userAuth != null)
        {
            userAuth.Username = updateDto.Username;
            userAuth.Password = updateDto.Password; // Consider adding password hashing here
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> DeleteUser(UserDeleteDto deleteDto)
    {
        try
        {
            var normalizedRole = deleteDto.Role switch
            {
                "manager" => "Manager",
                "doctor" => "Doctor",
                "groomer" => "Groomer",
                "receptionist" => "Receptionist",
                "client" => "Client",
                _ => deleteDto.Role
            };

            return normalizedRole switch
            {
                "Manager" => await DeleteManager(deleteDto.RoleId),
                "Doctor" => await DeleteDoctor(deleteDto.RoleId),
                "Groomer" => await DeleteGroomer(deleteDto.RoleId),
                "Receptionist" => await DeleteReceptionist(deleteDto.RoleId),
                "Client" => await DeleteClient(deleteDto.RoleId),
                _ => false
            };
        }
        catch
        {
            return false;
        }
    }

    private async Task<bool> DeleteManager(int managerId)
    {
        var manager = await _context.Managers
            .Include(m => m.UserAuths)
            .FirstOrDefaultAsync(m => m.ManagerId == managerId);

        return await DeleteUserAndAuth(manager);
    }

    private async Task<bool> DeleteDoctor(int doctorId)
    {
        var doctor = await _context.Doctors
            .Include(d => d.UserAuths)
            .FirstOrDefaultAsync(d => d.DoctorId == doctorId);

        return await DeleteUserAndAuth(doctor);
    }

    private async Task<bool> DeleteGroomer(int groomerId)
    {
        var groomer = await _context.Groomers
            .Include(g => g.UserAuths)
            .FirstOrDefaultAsync(g => g.GroomerId == groomerId);

        return await DeleteUserAndAuth(groomer);
    }

    private async Task<bool> DeleteReceptionist(int receptionistId)
    {
        var receptionist = await _context.Receptionists
            .Include(r => r.UserAuths)
            .FirstOrDefaultAsync(r => r.ReceptionistId == receptionistId);

        return await DeleteUserAndAuth(receptionist);
    }

    private async Task<bool> DeleteClient(int clientId)
    {
        var client = await _context.Clients
            .Include(c => c.UserAuths)
            .FirstOrDefaultAsync(c => c.ClientId == clientId);

        return await DeleteUserAndAuth(client);
    }

    private async Task<bool> DeleteUserAndAuth(dynamic user)
    {
        if (user == null) return false;

        foreach (var auth in user.UserAuths)
        {
            _context.UserAuths.Remove(auth);
        }

        _context.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}