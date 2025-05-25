using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
using Back_End.Services.ServicesInterface;

namespace Back_End.Services;

public class CartService : ICart
{
    private readonly PawPalsDbContext _context;

    public CartService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<bool?> CartPayment(CartCheckoutDto dto)
    {
        // 1. Create the Bill
        var bill = new Bill
        {
            ClientId = dto.ClientId,
            PaymentMethod = dto.PaymentMethod,
            TotalAmount = dto.TotalAmount,
            Date = DateTime.UtcNow
        };

        _context.Bills.Add(bill);
        await _context.SaveChangesAsync(); // Save to get BillId

        // 2. Add Services (Timetables + ChargesFor)
        foreach (var serviceDto in dto.Services)
        {
            // Create timetable entry
            var timetable = new Timetable
            {
                StartTime = serviceDto.StartTime,
                EndTime = serviceDto.EndTime,
                Description = serviceDto.Description,
                Status = serviceDto.Status,
                PetId = serviceDto.PetId,
                ServiceId = serviceDto.ServiceId
            };

            _context.Timetables.Add(timetable);

            // Link service to the bill (ChargesFor)
            var service = await _context.Services.FindAsync(serviceDto.ServiceId);
            if (service != null)
            {
                bill.Services.Add(service);
            }
        }

        // 3. Add Products (IsIncludedIn)
        foreach (var productDto in dto.Products)
        {
            var inclusion = new IsIncludedIn
            {
                BillId = bill.BillId,
                ProductId = productDto.ProductId,
                NoItemsBought = productDto.Quantity
            };

            _context.IsIncludedIns.Add(inclusion);
        }

        await _context.SaveChangesAsync();
        return true;
    }

    
}