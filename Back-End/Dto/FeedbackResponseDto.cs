// FeedbackResponseDto.cs in Back_End/Dto
namespace Back_End.Dto;

public class FeedbackResponseDto
{
    public int FeedbackId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public DateTime Date { get; set; }
}
