using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string Comment { get; set; } = null!;

    public DateTime Date { get; set; }
}
