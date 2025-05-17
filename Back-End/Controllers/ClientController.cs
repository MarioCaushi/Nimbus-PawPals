// ClientController.cs in Back_End/Controllers
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClients()
    {
        var clients = await _clientService.GetAllClients();
        return Ok(clients);
    }
    [HttpGet("{clientId}")]
    public async Task<IActionResult> GetClientById(int clientId)
    {
        var client = await _clientService.GetClientById(clientId);
        if (client == null)
        {
            return NotFound();
        }
        return Ok(client);
    }
    [HttpGet("{clientId}/bills")]
    public async Task<IActionResult> GetClientBillHistory(int clientId)
    {
        var bills = await _clientService.GetClientBillHistory(clientId);
        if (bills == null || bills.Count == 0)
        {
            return NotFound();
        }
        return Ok(bills);
    }
    [HttpPut("edit")]
    public async Task<IActionResult> EditClientInfo([FromBody] ClientEditDto dto)
    {
        try
        {
            var success = await _clientService.EditClientInfo(dto);
            if (!success) return NotFound("Client not found.");
            return Ok("Client updated successfully.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
// Controllers/ClientController.cs

    [HttpDelete("{clientId}")]
    public async Task<IActionResult> DeleteClient(int clientId)
    {
        var result = await _clientService.DeleteClient(clientId);
        if (!result) return NotFound("Client not found.");
        return Ok("Client and associated UserAuth deleted successfully.");
    }

}