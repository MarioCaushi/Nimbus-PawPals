// LoginResponseDto.cs
namespace Back_End.Dto;

public class LoginResponseDto
{
    public string Role { get; set; }  // "Manager", "Client", "Groomer", "Doctor", "Receptionist"
    public int RoleId { get; set; }    // The ID specific to their role
}