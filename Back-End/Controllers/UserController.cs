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
 
    [HttpGet("staff")]
    public async Task<IActionResult> GetStaffUser()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var roleClaim = User.FindFirstValue(ClaimTypes.Role); // Get role from claims
        
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Unauthorized();
        }
    
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return BadRequest("Invalid user ID format");
        }

        var user = await _userService.GetStaffUser(userId, roleClaim); // Pass both arguments
        return user == null ? NotFound() : Ok(user);
    }

    [HttpPut("staff/personal")]
    public async Task<IActionResult> UpdateStaffPersonalInfo([FromBody] StaffUpdateDto updateDto)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var roleClaim = User.FindFirstValue(ClaimTypes.Role);
        
        if (string.IsNullOrEmpty(userIdClaim)) 
        {
            return Unauthorized();
        }
    
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return BadRequest("Invalid user ID format");
        }

        var result = await _userService.UpdateStaffPersonalInfo(updateDto, userId, roleClaim);
        return result ? Ok() : BadRequest();
    }

    [HttpDelete]
    [Consumes("application/json")]
    public async Task<IActionResult> DeleteUser([FromBody] UserDeleteDto deleteDto)
    {
        var result = await _userService.DeleteUser(deleteDto);
        return result ? Ok() : BadRequest();
    }
}