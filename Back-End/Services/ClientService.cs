// ClientService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class ClientService : IClientService
{
    private readonly PawPalsDbContext _context;

    public ClientService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<List<ClientDto>> GetAllClients()
    {
        return await _context.Clients
            .OrderBy(c => c.LastName)
            .ThenBy(c => c.FirstName)
            .Select(c => new ClientDto
            {
                ClientId = c.ClientId,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                ContactNumber = c.ContactNumber,
                RegisterDate = c.RegisterDate
            })
            .ToListAsync();
    }
}