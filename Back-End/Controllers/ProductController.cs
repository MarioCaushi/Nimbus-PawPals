// ProductController.cs in Back_End/Controllers
using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProducts();
        return Ok(products);
    }
    [HttpPost("search")]
    public async Task<IActionResult> SearchProducts([FromBody] ProductSearchDto searchDto)
    {
        var products = await _productService.SearchProducts(searchDto);
        return Ok(products);
    }
    [HttpDelete("{productId}")]
    public async Task<IActionResult> DeleteProduct(int productId)
    {
        var result = await _productService.DeleteProduct(productId);
        return result ? Ok() : NotFound();
    }
    [HttpGet("types")]
    public async Task<IActionResult> GetProductTypes()
    {
        var types = await _productService.GetProductTypes();
        return Ok(types);
    }
    [HttpPost]
    public async Task<IActionResult> AddProduct([FromBody] ProductDto productDto)
    {
        // Set the DateAdded to current UTC time
        productDto.DateAdded = DateTime.UtcNow;
        
        var result = await _productService.AddProduct(productDto);
        return result ? Ok() : BadRequest();
    }
    [HttpPut]
    public async Task<IActionResult> EditProduct([FromBody] ProductDto productDto)
    {
        var result = await _productService.EditProduct(productDto);
        return result ? Ok() : BadRequest();
    }
}