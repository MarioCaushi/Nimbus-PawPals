using System;
using System.Collections.Generic;
namespace Back_End.Dto;

public class BillProductDto
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}