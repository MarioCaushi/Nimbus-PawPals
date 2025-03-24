using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class IsIncludedIn
{
    public int NoItemsBought { get; set; }

    public int BillId { get; set; }

    public int ProductId { get; set; }

    public virtual Bill Bill { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
