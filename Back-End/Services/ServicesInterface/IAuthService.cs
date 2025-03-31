using Back_End.Dto;
using Back_End.Models;
namespace Back_End.Services.ServicesInterface;

public interface IAuthService
{
    Task<LoginResponseDto?> Authenticate(AuthenticationDto authDto);
    
    Task<RegisterResponseDto> RegisterClient(RegisterDto registerDto);
}
public class RegistrationResult
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public int PersonalId { get; set; }
}
