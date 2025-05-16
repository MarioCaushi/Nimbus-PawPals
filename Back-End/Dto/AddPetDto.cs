namespace Back_End.Dto;

public class AddPetDto
{
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string Breed { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateOnly Birthday { get; set; } // Format: yyyy-MM-dd
    public decimal Weight { get; set; }
    public string? SpecialNeed { get; set; }
    public int HealthStatus { get; set; }
    public string? AllergyInfo { get; set; }
    public string Castrated { get; set; } = "No"; // Accepts "Yes"/"No"
    public int ClientId { get; set; }
}