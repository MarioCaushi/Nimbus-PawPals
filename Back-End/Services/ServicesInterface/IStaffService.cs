using Back_End.Dto;

namespace Back_End.Services.ServicesInterface;

public interface IStaffService
{
    Task<StaffListDto> GetAllStaff();   
    Task<StaffListDto> SearchStaff(StaffSearchDto searchDto);

    Task<string?> AddStaff(AddStaffDto staffDto); 


    Task<List<SalaryInfoDto>> GetAllSalaryOptions();

}