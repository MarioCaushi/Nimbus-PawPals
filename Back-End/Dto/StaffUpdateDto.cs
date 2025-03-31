// StaffUpdateDto.cs in Back_End/Dto
namespace Back_End.Dto;

public class StaffUpdateDto
{
   
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly Birthday { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string ContactNumber { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}