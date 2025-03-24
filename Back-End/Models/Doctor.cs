using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public int PersonalId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public string Email { get; set; } = null!;

    public string ContactNumber { get; set; } = null!;

    public string Address { get; set; } = null!;

    public DateTime HireDate { get; set; }

    public string Specialty { get; set; } = null!;

    public string Qualifications { get; set; } = null!;

    public int SalaryId { get; set; }

    public virtual Salary Salary { get; set; } = null!;

    public virtual ICollection<UserAuth> UserAuths { get; set; } = new List<UserAuth>();
}
