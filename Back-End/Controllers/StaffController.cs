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
    [HttpPost("search")]
    public async Task<IActionResult> SearchStaff([FromBody] StaffSearchDto searchDto)
    {
        var staff = await _staffService.SearchStaff(searchDto);
        return Ok(staff);
    }

    [HttpPost]
    public async Task<IActionResult> AddStaff([FromBody] AddStaffDto staffDto)
    {
        var error = await _staffService.AddStaff(staffDto);
            
        if (error == null)
            return Ok();
            
        return BadRequest(error);
    }

    
    [HttpGet("salaries")]
    public async Task<IActionResult> GetAllSalaries()
    {
        var salaries = await _staffService.GetAllSalaryOptions();
        return Ok(salaries);
    }


}