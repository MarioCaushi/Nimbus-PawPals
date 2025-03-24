using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceType { get; set; } = null!;

    public string ServiceName { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int EstimatedDuration { get; set; }

    public virtual ICollection<Timetable> Timetables { get; set; } = new List<Timetable>();

    public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();
}
