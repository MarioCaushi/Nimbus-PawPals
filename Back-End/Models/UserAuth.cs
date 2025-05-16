using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class UserAuth
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    public int? ManagerId { get; set; }

    public int? ClientId { get; set; }

    public int? GroomerId { get; set; }

    public int? DoctorId { get; set; }

    public int? ReceptionistId { get; set; }

    public virtual Client? Client { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Groomer? Groomer { get; set; }

    public virtual Manager? Manager { get; set; }

    public virtual Receptionist? Receptionist { get; set; }
    // Add to your UserAuth model
  
}
