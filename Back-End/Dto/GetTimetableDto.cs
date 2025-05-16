namespace Back_End.Dto;

public class GetTimetableDto
{
    public int AppointmentId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; }

    public int PetId { get; set; }
    public string PetName { get; set; }
    public string PetSpecies { get; set; }
    public string PetBreed { get; set; }
    public string PetOwner { get; set; }

    public int ServiceId { get; set; }
    public string ServiceName { get; set; }
    public string ServiceType { get; set; }
    public string ServiceDescription { get; set; }
    public decimal Price { get; set; }
    public string EstimatedDuration { get; set; }
}