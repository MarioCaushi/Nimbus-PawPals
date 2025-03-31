using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IPetService
{
    Task<List<PetDto>> GetAllPets();
    
}