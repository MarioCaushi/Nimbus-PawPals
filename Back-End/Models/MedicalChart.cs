using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class MedicalChart
{
    public int MedicalChartId { get; set; }

    public string Description { get; set; } = null!;

    public DateTime Date { get; set; }

    public int PetId { get; set; }

    public virtual Pet Pet { get; set; } = null!;
}
