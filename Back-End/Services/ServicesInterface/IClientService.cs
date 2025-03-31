using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IClientService
{
    Task<List<ClientDto>> GetAllClients();
}