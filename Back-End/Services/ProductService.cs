// ProductService.cs in Back_End/Services
using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
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
        if (!string.IsNullOrEmpty(searchDto.SearchWord.Trim()))
        {
            query = query.Where(p => 
                p.Name.ToLower().Trim().Contains(searchDto.SearchWord.ToLower().Trim()) || 
                (p.Description != null && p.Description.ToLower().Trim().Contains(searchDto.SearchWord.ToLower().Trim()))
            );
        }

        // Apply category filter
        if (!string.IsNullOrEmpty(searchDto.Category.Trim()))
        {
            query = query.Where(p => p.Category.ToLower().Trim() == searchDto.Category.ToLower().Trim());
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
        if (!string.IsNullOrEmpty(searchDto.AnimalType.Trim().ToLower()))
        {
            query = query.Where(p => p.AnimalType.ToLower().Trim() == searchDto.AnimalType.ToLower().Trim());
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
    // In your ProductService implementation
    public async Task<bool> AddProduct(ProductDto productDto)
    {
        try
        {
            var product = new Product
            {
                Name = productDto.Name,
                Category = productDto.Category,
                Price = productDto.Price,
                Description = productDto.Description,
                ImageUrl = productDto.ImageUrl,
                AnimalType = productDto.AnimalType,
                DateAdded = productDto.DateAdded
            };

            // Add to database (implementation depends on your ORM)
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        
            return true;
        }
        catch
        {
            return false;
        }
    }
    // ProductService.cs
    public async Task<bool> EditProduct(ProductDto productDto)
    {
        try
        {
            var existingProduct = await _context.Products.FindAsync(productDto.ProductId);
        
            if (existingProduct == null)
                return false;

            // Update the fields
            existingProduct.Name = productDto.Name;
            existingProduct.Category = productDto.Category;
            existingProduct.Price = productDto.Price;
            existingProduct.Description = productDto.Description;
            existingProduct.ImageUrl = productDto.ImageUrl;
            existingProduct.AnimalType = productDto.AnimalType;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();
        
            return true;
        }
        catch
        {
            return false;
        }
    }
}