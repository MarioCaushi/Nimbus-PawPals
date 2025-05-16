using System;
namespace Back_End.Dto;

public class AddStaffDto
{
    public int PersonalId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public DateTime Birthday { get; set; }
    public string ContactNumber { get; set; }
    public string Address { get; set; }
    public string? Specialty { get; set; } // Only for doctors
    public string? Qualification { get; set; } // For doctors and receptionists
    public int SalaryId { get; set; }
    public string Role { get; set; } // "doctor", "receptionist", "groomer", "manager"
}