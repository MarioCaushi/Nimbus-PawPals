using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class AuthService : IAuthService
{
    private readonly PawPalsDbContext _context;

    public AuthService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponseDto?> Authenticate(AuthenticationDto authDto)
    {
        var user = await _context.UserAuths
            .FirstOrDefaultAsync(u => u.Username == authDto.Username && 
                                      u.Password == authDto.Password);

        if (user == null) return null;

        return new LoginResponseDto
        {
            Role = user.Role,
            RoleId = user.Role switch
            {
                "Manager" => user.ManagerId ?? 0,
                "Client" => user.ClientId ?? 0,
                "Groomer" => user.GroomerId ?? 0,
                "Doctor" => user.DoctorId ?? 0,
                "Receptionist" => user.ReceptionistId ?? 0,
                _ => 0
            }
        };
    }

    public async Task<RegisterResponseDto> RegisterClient(RegisterDto registerDto)
    {
        if (await _context.UserAuths.AnyAsync(u => u.Username == registerDto.Username))
        {
            return new RegisterResponseDto
            {
                Success = false,
                Message = "Username already exists"
            };
        }

        try
        {
            var client = new Client
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Birthday = registerDto.Birthday,
                Email = registerDto.Email,
                ContactNumber = registerDto.ContactNumber,
                Address = registerDto.Address,
                RegisterDate = DateTime.Now,
                PreferredContact = registerDto.PreferredContact
            };

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            var userAuth = new UserAuth
            {
                Username = registerDto.Username,
                Password = registerDto.Password, // No hashing
                Role = "Client",
                ClientId = client.ClientId
            };

            _context.UserAuths.Add(userAuth);
            await _context.SaveChangesAsync();

            return new RegisterResponseDto
            {
                Success = true,
                Message = "Registration successful",
                ClientId = client.ClientId
            };
        }
        catch (Exception ex)
        {
            return new RegisterResponseDto
            {
                Success = false,
                Message = "Registration failed"
            };
        }
    }
}
