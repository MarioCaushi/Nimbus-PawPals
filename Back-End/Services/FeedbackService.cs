// FeedbackService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class FeedbackService : IFeedbackService
{
    private readonly PawPalsDbContext _context;

    public FeedbackService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<bool> SubmitFeedback(FeedbackDto feedbackDto)
    {
        try
        {
            var feedback = new Feedback
            {
                FirstName = feedbackDto.FullName.Split(' ')[0],
                LastName = feedbackDto.FullName.Split(' ').Length > 1
                    ? string.Join(" ", feedbackDto.FullName.Split(' ').Skip(1))
                    : "",
                UserEmail = feedbackDto.Email,
                Comment = feedbackDto.Message,
                Date = DateTime.Now
            };

            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;


        }
    }
    public async Task<List<FeedbackResponseDto>> GetAllFeedbacks()
    {
        return await _context.Feedbacks
            .OrderByDescending(f => f.Date)
            .Select(f => new FeedbackResponseDto
            {
                FeedbackId = f.FeedbackId,
                FullName = $"{f.FirstName} {f.LastName}".Trim(),
                Email = f.UserEmail,
                Message = f.Comment,
                Date = f.Date
            })
            .ToListAsync();
    }
    public async Task<bool> DeleteFeedback(int feedbackId)
    {
        try
        {
            var feedback = await _context.Feedbacks
                .FirstOrDefaultAsync(f => f.FeedbackId == feedbackId);

            if (feedback == null)
                return false;

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }
}