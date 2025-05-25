using System.Collections.Generic;
using System.Threading.Tasks;
using Back_End.Dto;

namespace Back_End.Services.ServicesInterface
{
    public interface ITimetableService
    {
        Task<List<object>> GetAllTimetablesAsync();
        Task<string?> UpdateAppointmentStatusAsync(UpdateTimetableStatusDto dto);
        Task<bool?> AddAppointmentAsync(AddTimetableDto dto);

    }
}