using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IProductService
{
    Task<List<ProductDto>> GetAllProducts();
    Task<List<ProductDto>> SearchProducts(ProductSearchDto searchDto);
    Task<bool> DeleteProduct(int productId);
    Task<ProductTypesDto> GetProductTypes();

}