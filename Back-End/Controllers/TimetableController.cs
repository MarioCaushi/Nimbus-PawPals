using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TimetableController : ControllerBase
{
    private readonly ITimetableService _timetableService;

    public TimetableController(ITimetableService timetableService)
    {
        _timetableService = timetableService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTimetables()
    {
        var timetables = await _timetableService.GetAllTimetablesAsync();
        return Ok(timetables);
    }
    [HttpPut]
    public async Task<IActionResult> UpdateStatus([FromBody] UpdateTimetableStatusDto dto)
    {
        var error = await _timetableService.UpdateAppointmentStatusAsync(dto);

        if (error == null)
            return Ok();

        return BadRequest(error);
    }
    [HttpPost("addTimetable")]
    public async Task<IActionResult> AddAppointment([FromBody] AddTimetableDto dto)
    {
        var error = await _timetableService.AddAppointmentAsync(dto);

        if (error == true)
            return Ok();

        return BadRequest();
    }

}