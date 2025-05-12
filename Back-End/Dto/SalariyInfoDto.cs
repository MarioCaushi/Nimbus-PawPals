namespace Back_End.Dto;

public class SalaryInfoDto
{
    public int SalaryId { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal OvertimeRate { get; set; }
    public string PayCycle { get; set; }
    public string? Role { get; set; } // "Doctor", "Groomer", etc.
    public string? Specialty { get; set; } // For doctors only
}
