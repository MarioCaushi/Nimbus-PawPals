namespace Back_End.Dto;

public class ProductDto
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string AnimalType { get; set; }
    public DateTime DateAdded { get; set; }
}