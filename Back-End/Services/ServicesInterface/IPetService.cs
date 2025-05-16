using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IPetService
{
    Task<List<PetDto>> GetAllPets();
    Task<bool> DeletePet(int petId);
    Task<List<object>> GetMedicalRecordsByPetId(int petId);
    Task<List<object>> GetAppointmentsByPetId(int petId);
    Task<List<PetDto>> GetPetsByClientId(int clientId);
    Task<bool> UpdatePetInfo(int petId, UpdatePetInfoDto updatedInfo);
    Task<bool> AddPet(AddPetDto petDto);
    Task<string?> AddMedicalChart(AddMedicalChartDto dto);

    
}