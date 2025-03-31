namespace Back_End.Dto;

public class StaffListDto
{
    
        public List<DoctorDto> Doctors { get; set; } = new List<DoctorDto>();
        public List<GroomerDto> Groomers { get; set; } = new List<GroomerDto>();
        public List<ReceptionistDto> Receptionists { get; set; } = new List<ReceptionistDto>();
    }

    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
    }

    public class GroomerDto
    {
        public int GroomerId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class ReceptionistDto
    {
        public int ReceptionistId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Qualification { get; set; } = string.Empty;
    }
