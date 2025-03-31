// StaffController.cs in Back_End/Controllers
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly IStaffService _staffService;

    public StaffController(IStaffService staffService)
    {
        _staffService = staffService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllStaff()
    {
        var staff = await _staffService.GetAllStaff();
        return Ok(staff);
    }
    [HttpGet("search")]
    public async Task<IActionResult> SearchStaff([FromQuery] StaffSearchDto searchDto)
    {
        var staff = await _staffService.SearchStaff(searchDto);
        return Ok(staff);
    }
}