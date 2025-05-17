namespace Back_End.Dto;

public class UpdatePetInfoDto
{
    public string Color { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateOnly Birthday { get; set; }  // Ensure front end sends in yyyy-MM-dd format
    public decimal Weight { get; set; }
    public string? SpecialNeed { get; set; }
    public int HealthStatus { get; set; }
    public string? AllergyInfo { get; set; }
    public string Castrated { get; set; } = "No"; // Expect "Yes" or "No" from frontend
}