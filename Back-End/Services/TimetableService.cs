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
        public async Task<bool?> AddAppointmentAsync(AddTimetableDto dto)
        {
            // 1. Create the Bill
            var newBill = new Bill
            {
                ClientId = dto.ClientId,
                PaymentMethod = dto.PaymentMethod,
                TotalAmount = dto.TotalAmount,
                Date = DateTime.UtcNow,
                Services = new List<Service>() // Ensure it's not null
            };

            // 2. Load Services and add to the Bill
            foreach (var serviceId in dto.ServiceId)
            {
                var service = await _context.Services.FindAsync(serviceId);
                if (service != null)
                {
                    newBill.Services.Add(service);
                }
            }

            // Add the Bill to the context
            _context.Bills.Add(newBill);

            // 3. Create Timetable entries for each service
            foreach (var serviceId in dto.ServiceId)
            {
                var appointment = new Timetable
                {
                    StartTime = dto.StartTime,
                    EndTime = dto.EndTime,
                    Description = dto.Description,
                    Status = dto.Status,
                    PetId = dto.PetId,
                    ServiceId = serviceId
                };

                _context.Timetables.Add(appointment);
            }

            // 4. Save everything at once
            await _context.SaveChangesAsync();
            return true;
        }
        
    }
    
}