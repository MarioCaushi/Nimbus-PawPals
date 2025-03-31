namespace Back_End.Dto;

public class UserRetrievalDto
{
    public string Role { get; set; }  // "Manager", "Doctor", "Groomer", "Receptionist"
    public int RoleId { get; set; }   // The ID specific to their role
}