namespace Back_End.Dto;

public class StaffUpdateDto
{
    public string Role { get; set; } = string.Empty;  // "doctor", "groomer", etc.
    public int RoleId { get; set; }                  // The ID of the staff member
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ContactNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateOnly Birthday { get; set; }
  
}