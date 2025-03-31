// PetDto.cs in Back_End/Dto
namespace Back_End.Dto;

public class PetDto
{
    public int PetId { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateOnly Birthday { get; set; }
    public string Species { get; set; } = string.Empty;
    public string Breed { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public decimal Weight { get; set; }
    public string? AllergyInfo { get; set; }
    public string? SpecialNeed { get; set; }
    public bool Castrated { get; set; }
    public int HealthStatus { get; set; }
    public DateTime RegisterDate { get; set; }
    public int ClientId { get; set; }
    public string ClientName { get; set; } = string.Empty;
}