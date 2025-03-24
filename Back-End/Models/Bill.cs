using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Bill
{
    public int BillId { get; set; }

    public decimal TotalAmount { get; set; }

    public DateTime Date { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public int ClientId { get; set; }

    public virtual Client Client { get; set; } = null!;

    public virtual ICollection<IsIncludedIn> IsIncludedIns { get; set; } = new List<IsIncludedIn>();

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
