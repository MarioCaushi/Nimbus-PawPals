// FeedbackController.cs in Back_End/Controllers
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly IFeedbackService _feedbackService;

    public FeedbackController(IFeedbackService feedbackService)
    {
        _feedbackService = feedbackService;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDto feedbackDto)
    {
        var result = await _feedbackService.SubmitFeedback(feedbackDto);
        return result ? Ok() : StatusCode(500);
    }
    [HttpGet]
    public async Task<IActionResult> GetAllFeedbacks()
    {
        var feedbacks = await _feedbackService.GetAllFeedbacks();
        return Ok(feedbacks);
    }
    [HttpDelete("{feedbackId}")]
    public async Task<IActionResult> DeleteFeedback(int feedbackId)
    {
        var result = await _feedbackService.DeleteFeedback(feedbackId);
        return result ? Ok() : NotFound();
    }
}