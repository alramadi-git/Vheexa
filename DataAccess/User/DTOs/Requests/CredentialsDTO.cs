namespace DataAccess.User.DTOs.Requests;

public class CredentialsDTO
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}