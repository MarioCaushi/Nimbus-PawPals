using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string Name { get; set; } = null!;

    public string Category { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string AnimalType { get; set; } = null!;

    public DateTime DateAdded { get; set; }

    public virtual ICollection<IsIncludedIn> IsIncludedIns { get; set; } = new List<IsIncludedIn>();
}
