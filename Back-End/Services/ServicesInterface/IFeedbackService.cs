using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IFeedbackService
{
        Task<bool> SubmitFeedback(FeedbackDto feedbackDto);
        Task<List<FeedbackResponseDto>> GetAllFeedbacks();
        Task<bool> DeleteFeedback(int feedbackId);

}