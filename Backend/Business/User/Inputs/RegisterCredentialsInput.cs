using Microsoft.AspNetCore.Http;

using Business.Inputs;

namespace Business.User.Inputs;

public class ClsRegisterCredentialsInput
{
    public IFormFile? Avatar { get; set; }
    public required ClsLocationInput Location { get; set; }
    public required string Username { get => field.Trim(); set; }
    public DateOnly Birthday { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required bool RememberMe { get; set; }
}