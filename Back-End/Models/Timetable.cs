using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Timetable
{
    public int AppointmentId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public string? Description { get; set; }

    public string Status { get; set; } = null!;

    public int PetId { get; set; }

    public int ServiceId { get; set; }

    public virtual Pet Pet { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;
}
