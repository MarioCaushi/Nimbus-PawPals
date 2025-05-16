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

    [HttpDelete("{petId}")]
    public async Task<IActionResult> DeletePet(int petId)
    {
        var success = await _petService.DeletePet(petId);
        if (!success) return NotFound("Pet not found.");
        return Ok("Pet deleted successfully.");
    }

    [HttpGet("{petId}/medical-records")]
    public async Task<IActionResult> GetMedicalRecordsByPetId(int petId)
    {
        var records = await _petService.GetMedicalRecordsByPetId(petId);
        if (records == null || records.Count == 0)
        {
            return NotFound("No medical records found for this pet.");
        }
        return Ok(records);
    }
    [HttpGet("{petId}/appointments")]
    public async Task<IActionResult> GetAppointmentsByPetId(int petId)
    {
        var appointments = await _petService.GetAppointmentsByPetId(petId);
        if (appointments == null || appointments.Count == 0)
        {
            return NotFound("No appointments found for this pet.");
        }
        return Ok(appointments);
    }
    [HttpGet("by-client/{clientId}")]
    public async Task<IActionResult> GetPetsByClientId(int clientId)
    {
        var pets = await _petService.GetPetsByClientId(clientId);
        return Ok(pets);
    }

    [HttpPut("{petId}")]
    public async Task<IActionResult> UpdatePetInfo(int petId, [FromBody] UpdatePetInfoDto updatedInfo)
    {
        var success = await _petService.UpdatePetInfo(petId, updatedInfo);
        if (!success)
            return NotFound(false);

        return Ok(true);
    }
    [HttpPost]
    public async Task<IActionResult> AddPet([FromBody] AddPetDto petDto)
    {
        var success = await _petService.AddPet(petDto);
        if (!success)
            return BadRequest(false);

        return Ok(true);
    }
    [HttpPost("medical-chart")]
    public async Task<IActionResult> AddMedicalChart([FromBody] AddMedicalChartDto dto)
    {
        var error = await _petService.AddMedicalChart(dto);

        if (error != null)
            return BadRequest(error);

        return Ok("Medical chart added successfully.");
    }
}