using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Pet
{
    public int PetId { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public string Species { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public decimal Weight { get; set; }

    public string? AllergyInfo { get; set; }

    public string? SpecialNeed { get; set; }

    public string Breed { get; set; } = null!;

    public string Color { get; set; } = null!;

    public bool Castrated { get; set; }

    public int HealthStatus { get; set; }

    public DateTime RegisterDate { get; set; }

    public int ClientId { get; set; }

    public virtual Client Client { get; set; } = null!;

    public virtual ICollection<MedicalChart> MedicalCharts { get; set; } = new List<MedicalChart>();

    public virtual ICollection<Timetable> Timetables { get; set; } = new List<Timetable>();
}
