namespace Back_End.Dto;

public class ProductSearchDto
{
    public string SearchWord { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string AnimalType { get; set; } = "";
}