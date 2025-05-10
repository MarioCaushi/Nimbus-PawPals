using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Back_End.Models;

public partial class Salary
{
    public int SalaryId { get; set; }

    public decimal BaseSalary { get; set; }

    public string PayCycle { get; set; } = null!;

    public decimal OvertimeRate { get; set; }


    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    
    public virtual ICollection<Groomer> Groomers { get; set; } = new List<Groomer>();

    public virtual ICollection<Manager> Managers { get; set; } = new List<Manager>();

    public virtual ICollection<Receptionist> Receptionists { get; set; } = new List<Receptionist>();
}
