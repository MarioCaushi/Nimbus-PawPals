using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers;

public class CartController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}