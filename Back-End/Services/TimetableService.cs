using Back_End.Data;
using Back_End.Dto;
using Back_End.Models;
using Back_End.Services.ServicesInterface;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Services
{
    public class TimetableService : ITimetableService
    {
        private readonly PawPalsDbContext _context;

        public TimetableService(PawPalsDbContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAllTimetablesAsync()
        {
            var timetables = await _context.Timetables
                .Include(t => t.Pet)
                .ThenInclude(p => p.Client)
                .Include(t => t.Service)
                .Select(t => new
                {
                    appointmentId = t.AppointmentId,
                    startTime = t.StartTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                    endTime = t.EndTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                    description = t.Description,
                    status = t.Status,
                    petId = t.PetId,
                    petName = t.Pet.Name,
                    petSpecies = t.Pet.Species,
                    petBreed = t.Pet.Breed,
                    petOwner = t.Pet.Client.FirstName + " " + t.Pet.Client.LastName,
                    serviceId = t.ServiceId,
                    serviceName = t.Service.ServiceName,
                    serviceType = t.Service.ServiceType,
                    serviceDescription = t.Service.Description,
                    price = t.Service.Price,
                    estimatedDuration = $"{t.Service.EstimatedDuration} mins"
                })
                .ToListAsync();

            return timetables.Cast<object>().ToList(); // or return as List<dynamic>
        }
        public async Task<string?> UpdateAppointmentStatusAsync(UpdateTimetableStatusDto dto)
        {
            var appointment = await _context.Timetables.FindAsync(dto.AppointmentId);

            if (appointment == null)
                return "Appointment not found";

            appointment.Status = dto.Status;
            await _context.SaveChangesAsync();

            return null; // no error
        }
        public async Task<string?> AddAppointmentAsync(AddTimetableDto dto)
        {
            var petExists = await _context.Pets.AnyAsync(p => p.PetId == dto.PetId);
            var serviceExists = await _context.Services.AnyAsync(s => s.ServiceId == dto.ServiceId);

            if (!petExists)
                return "Pet not found";

            if (!serviceExists)
                return "Service not found";

            var newAppointment = new Timetable
            {
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Description = dto.Description,
                Status = dto.Status,
                PetId = dto.PetId,
                ServiceId = dto.ServiceId
            };

            _context.Timetables.Add(newAppointment);
            await _context.SaveChangesAsync();

            return null;
        }

    }
    
}