using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IClientService
{
    Task<List<ClientDto>> GetAllClients();
    Task<ClientDetailedDto> GetClientById(int clientId);
    Task<List<BillDto>> GetClientBillHistory(int clientId); 
    Task<bool> EditClientInfo(ClientEditDto dto);
    Task<bool> DeleteClient(int clientId);

}