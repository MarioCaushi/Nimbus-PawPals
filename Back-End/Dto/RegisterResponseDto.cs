namespace Back_End.Dto;

public class RegisterResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public int? ClientId { get; set; }
}