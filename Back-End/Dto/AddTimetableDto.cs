namespace Back_End.Dto
{
    public class AddTimetableDto
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = null!;
        public int PetId { get; set; }
        public List<int> ServiceId { get; set; } = new List<int>();
        
        public int ClientId { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public decimal TotalAmount { get; set; }
    }
}