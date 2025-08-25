namespace DataAccess.RequestDTOs;

public class CredentialsRequestDTO
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}