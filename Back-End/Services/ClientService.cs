// ClientService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
    public async Task<ClientDetailedDto> GetClientById(int clientId)
    {
        var client = await _context.Clients
            .Include(c => c.Pets)
            .Include(c => c.UserAuths)
            .FirstOrDefaultAsync(c => c.ClientId == clientId);

        if (client == null)
        {
            return null;
        }

        return new ClientDetailedDto
        {
            ClientId = client.ClientId,
            FirstName = client.FirstName,
            LastName = client.LastName,
            Username = client.UserAuths.FirstOrDefault()?.Username ?? string.Empty,
            Password = client.UserAuths.FirstOrDefault()?.Password ?? string.Empty,
            Email = client.Email,
            ContactNumber = client.ContactNumber,
            Address = client.Address,
            Birthday = client.Birthday,
            PreferredContact = client.PreferredContact,
            RegisteredDate = client.RegisterDate,
            Pets = client.Pets.Select(p => new ClientPetDto
            {
                PetId = p.PetId,
                Name = p.Name,
                Species = p.Species,
                Breed = p.Breed
            }).ToList()
        };
    }
    // ClientService.cs
    public async Task<List<BillDto>> GetClientBillHistory(int clientId)
    {
        var bills = await _context.Bills
            .Where(b => b.ClientId == clientId)
            .Include(b => b.IsIncludedIns)
            .ThenInclude(ii => ii.Product)
            .Include(b => b.Services) // because Bill has ICollection<Service>
            .OrderByDescending(b => b.Date)
            .ToListAsync();

        var billDtos = bills.Select(bill => new BillDto
        {
            BillId = bill.BillId,
            TotalAmount = bill.TotalAmount,
            Date = bill.Date,
            PaymentMethod = bill.PaymentMethod,
            Products = bill.IsIncludedIns.Select(ii => new BillProductDto
            {
                ProductId = ii.Product.ProductId,
                Name = ii.Product.Name,
                Category = ii.Product.Category,
                Price = ii.Product.Price,
                Quantity = ii.NoItemsBought
            }).ToList(),
            Services = bill.Services.Select(s => new BillServiceDto
            {
                ServiceId = s.ServiceId,
                ServiceType = s.ServiceType,
                ServiceName = s.ServiceName,
                Price = s.Price
            }).ToList()
        }).ToList();

        return billDtos;
    }
// Services/ClientService.cs

    public async Task<bool> EditClientInfo(ClientEditDto dto)
    {
        var client = await _context.Clients.Include(c => c.UserAuths).FirstOrDefaultAsync(c => c.ClientId == dto.ClientId);
        if (client == null) return false;

        // Check if username or email is already taken by another client
        bool usernameExists = await _context.UserAuths.AnyAsync(u => u.Username == dto.Username && u.ClientId != dto.ClientId);
        bool emailExists = await _context.Clients.AnyAsync(c => c.Email == dto.Email && c.ClientId != dto.ClientId);

        if (usernameExists || emailExists)
        {
            throw new InvalidOperationException(usernameExists ? "Username already taken." : "Email already taken.");
        }

        // Update client fields
        client.FirstName = dto.FirstName;
        client.LastName = dto.LastName;
        client.Email = dto.Email;
        client.ContactNumber = dto.ContactNumber;
        client.Address = dto.Address;
        client.Birthday = dto.Birthday;
        client.PreferredContact = dto.PreferredContact;

        // Update username & password in UserAuth (assuming one-to-one)
        var userAuth = client.UserAuths.FirstOrDefault();
        if (userAuth != null)
        {
            userAuth.Username = dto.Username;
            userAuth.Password = dto.Password; // consider hashing in real app
        }

        await _context.SaveChangesAsync();
        return true;
    }
// Services/ClientService.cs

    public async Task<bool> DeleteClient(int clientId)
    {
        var client = await _context.Clients
            .Include(c => c.UserAuths)
            .FirstOrDefaultAsync(c => c.ClientId == clientId);

        if (client == null) return false;

        // Remove UserAuth(s)
        _context.UserAuths.RemoveRange(client.UserAuths);

        // Remove the client
        _context.Clients.Remove(client);

        await _context.SaveChangesAsync();
        return true;
    }

}