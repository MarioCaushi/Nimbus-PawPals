using System;
using System.Collections.Generic;
namespace Back_End.Dto;

public class BillServiceDto
{
    public int ServiceId { get; set; }
    public string ServiceType { get; set; }
    public string ServiceName { get; set; }
    public decimal Price { get; set; }
}