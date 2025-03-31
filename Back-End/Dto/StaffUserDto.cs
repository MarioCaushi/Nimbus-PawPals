// StaffUserDto.cs
namespace Back_End.Dto;

public class StaffUserDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? ContactNumber { get; set; }
    public string? Address { get; set; }
    public DateOnly Birthday { get; set; }
    public DateTime HireDate { get; set; }
    public decimal BaseSalary { get; set; }
    public string? PayCycle { get; set; }
    public string? Specialty { get; set; }
    public string? Qualifications { get; set; }
    public int PersonalId { get; set; }
}