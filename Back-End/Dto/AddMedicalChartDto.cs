namespace Back_End.Dto
{
    public class AddMedicalChartDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = null!;
        public int PetId { get; set; }
    }
}