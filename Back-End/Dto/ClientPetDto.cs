using System;
using System.Collections.Generic;
namespace Back_End.Dto;

public class ClientPetDto
{
    public int PetId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string Breed { get; set; } = string.Empty;
}