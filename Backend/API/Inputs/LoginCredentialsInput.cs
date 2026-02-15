namespace API.Inputs;

public class ClsLoginCredentialsInput
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public bool RememberMe { get; set; }
}