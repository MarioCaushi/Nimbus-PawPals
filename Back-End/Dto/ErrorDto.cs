using System.Text.Json;

namespace Back_End.Dto;

public class ErrorDto
{
    public int StatusCode { get; set; }
    
    public string Message { get; set; }
    
    public string Path { get; set; }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}