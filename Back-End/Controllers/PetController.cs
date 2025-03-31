// PetController.cs in Back_End/Controllers
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetController : ControllerBase
{
    private readonly IPetService _petService;

    public PetController(IPetService petService)
    {
        _petService = petService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPets()
    {
        var pets = await _petService.GetAllPets();
        return Ok(pets);
    }
}