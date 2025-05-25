namespace Back_End.Dto
{
    public class CartCheckoutDto
    {
        public int ClientId { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public decimal TotalAmount { get; set; }

        public List<ServiceDto> Services { get; set; } = new List<ServiceDto>();
        public List<ProductCardDto> Products { get; set; } = new List<ProductCardDto>();
    }

    public class ServiceDto
    {
        public int ServiceId { get; set; }
        public int PetId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = "Pending";
    }

    public class ProductCardDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string AnimalType { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}