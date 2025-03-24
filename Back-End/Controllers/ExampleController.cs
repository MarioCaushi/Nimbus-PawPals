using Back_End.Models;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExampleController : Controller
{
    private readonly IExample _example;

    public ExampleController(IExample example)
    {
        _example = example;
    }

    [HttpGet("get-all-managers")]
    public async Task<IActionResult> getAllManagers()
    {
        var result = await _example.getAllManagers();
        return Ok(result);
    }
}