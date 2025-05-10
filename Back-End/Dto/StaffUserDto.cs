using Back_End.Models;

public class StaffUserDto
{
    // Universal fields
    public string? Username { get; set; }
    public string? Password { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal? OvertimeRate { get; set; }

    // Optional role-based models
    public Doctor? Doctor { get; set; }
    public Groomer? Groomer { get; set; }
    public Receptionist? Receptionist { get; set; }
    public Manager? Manager { get; set; }
}