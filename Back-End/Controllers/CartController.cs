using Back_End.Dto;
using Back_End.Services.ServicesInterface;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : Controller
{
    private readonly ICart _cartService;

    public CartController(ICart cartService)
    {
        _cartService = cartService;
    }

    [HttpPost("proceedPayment")]
    public async Task<IActionResult?> ProceedPayment([FromBody] CartCheckoutDto? checkout)
    {
        try
        {
            var done = await _cartService.CartPayment(checkout);
            return Ok(done);
        }
        catch (Exception ex)
        {
            // TEMP log to console or file
            Console.WriteLine("Error during CartPayment: " + ex.Message);
            return StatusCode(500, "Internal server error: " + ex.Message);
        }

    }
    

}