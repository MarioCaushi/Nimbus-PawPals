namespace Back_End.Dto;

public class UserDeleteDto
{
    public string Role { get; set; } = string.Empty;  // "Manager", "Doctor", etc.
    public int RoleId { get; set; }
}