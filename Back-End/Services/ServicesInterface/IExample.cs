using Back_End.Models;

namespace Back_End.Services.ServicesInterface;

public interface IExample
{
    // Example method signature to view all clients
    public Task<List<Manager>> getAllManagers();
}