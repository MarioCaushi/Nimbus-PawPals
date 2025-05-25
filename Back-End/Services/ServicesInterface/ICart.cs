using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface ICart
{
    Task<bool?> CartPayment (CartCheckoutDto cartCheckoutDto);
}