namespace Back_End.Dto
{
    public class UpdateTimetableStatusDto
    {
        public int AppointmentId { get; set; }
        public string Status { get; set; } = null!;
    }
}