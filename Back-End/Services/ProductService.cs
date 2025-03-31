// ProductService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services;

public class ProductService : IProductService
{
    private readonly PawPalsDbContext _context;

    public ProductService(PawPalsDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductDto>> GetAllProducts()
    {
        return await _context.Products
            .OrderByDescending(p => p.DateAdded)
            .Select(p => new ProductDto
            {
                ProductId = p.ProductId,
                Name = p.Name,
                Category = p.Category,
                Price = p.Price,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                AnimalType = p.AnimalType,
                DateAdded = p.DateAdded
            })
            .ToListAsync();
    }
    public async Task<List<ProductDto>> SearchProducts(ProductSearchDto searchDto)
    {
        var query = _context.Products.AsQueryable();

        // Apply search word filter (both name and description)
        if (!string.IsNullOrEmpty(searchDto.SearchWord))
        {
            query = query.Where(p => 
                p.Name.Contains(searchDto.SearchWord) || 
                (p.Description != null && p.Description.Contains(searchDto.SearchWord))
            );
        }

        // Apply category filter
        if (!string.IsNullOrEmpty(searchDto.Category))
        {
            query = query.Where(p => p.Category == searchDto.Category);
        }

        // Apply price range filter
        if (searchDto.MinPrice.HasValue)
        {
            query = query.Where(p => p.Price >= searchDto.MinPrice.Value);
        }
        if (searchDto.MaxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= searchDto.MaxPrice.Value);
        }

        // Apply animal type filter
        if (!string.IsNullOrEmpty(searchDto.AnimalType))
        {
            query = query.Where(p => p.AnimalType == searchDto.AnimalType);
        }

        return await query
            .OrderByDescending(p => p.DateAdded)
            .Select(p => new ProductDto
            {
                ProductId = p.ProductId,
                Name = p.Name,
                Category = p.Category,
                Price = p.Price,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                AnimalType = p.AnimalType,
                DateAdded = p.DateAdded
            })
            .ToListAsync();
    }
    public async Task<bool> DeleteProduct(int productId)
    {
        try
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public async Task<ProductTypesDto> GetProductTypes()
    {
        var categories = await _context.Products
            .Select(p => p.Category)
            .Distinct()
            .ToListAsync();

        var animalTypes = await _context.Products
            .Select(p => p.AnimalType)
            .Distinct()
            .ToListAsync();

        return new ProductTypesDto
        {
            Categories = categories,
            AnimalTypes = animalTypes
        };
    }
}