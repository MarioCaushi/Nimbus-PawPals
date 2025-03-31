namespace Back_End.Dto;

public class StaffSearchDto
{
    public string SearchWord { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // "Doctor", "Groomer", "Receptionist", or empty
}