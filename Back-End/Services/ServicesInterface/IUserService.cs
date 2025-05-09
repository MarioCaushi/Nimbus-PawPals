using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IUserService
{
    Task<StaffUserDto?> GetStaffUser(int userId, string role);
    Task<bool> UpdateStaffPersonalInfo(StaffUpdateDto updateDto, int userId, string role);
    Task<bool> DeleteUser(UserDeleteDto deleteDto);
  

}