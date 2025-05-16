using System;
using System.Collections.Generic;
namespace Back_End.Dto;

public class BillDto
{
    public int BillId { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime Date { get; set; }
    public string PaymentMethod { get; set; }
    public List<BillProductDto> Products { get; set; } = new List<BillProductDto>();
    public List<BillServiceDto> Services { get; set; } = new List<BillServiceDto>();

}