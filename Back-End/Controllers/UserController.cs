using System.Security.Claims;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
 
    [HttpPost("staff")]
    public async Task<IActionResult> GetStaffUser([FromBody] UserRetrievalDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Role) || request.RoleId <= 0)
        {
            return BadRequest("Both role and roleId must be provided and valid.");
        }

        var user = await _userService.GetStaffUser(request.RoleId, request.Role);

        if (user == null)
        {
            return NotFound("Staff member not found.");
        }

        return Ok(user);
    }


    [HttpPut("staff/personal")]
    public async Task<IActionResult> UpdateStaffPersonalInfo([FromBody] StaffUpdateDto updateDto)
    {
        // You'll need to get userId and role from the request body instead of claims
        if (updateDto.RoleId <= 0 || string.IsNullOrEmpty(updateDto.Role))
        {
            return BadRequest("Both role and roleId must be provided and valid.");
        }

        var result = await _userService.UpdateStaffPersonalInfo(updateDto, updateDto.RoleId, updateDto.Role);
        return result ? Ok() : BadRequest("Failed to update personal information");
    }

    [HttpDelete ("delete")]
    public async Task<IActionResult> DeleteUser([FromBody] UserDeleteDto deleteDto)
    {
        var result = await _userService.DeleteUser(deleteDto);
        return result ? Ok() : BadRequest();
    }
}