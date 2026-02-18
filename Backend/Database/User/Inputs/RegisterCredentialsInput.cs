using Database.Inputs;

namespace Database.User.Inputs;

public class ClsRegisterCredentialsInput
{
    public Guid Uuid { get; set; }
    public ClsImageInput? Avatar { get; set; }
    public required ClsLocationInput Location { get; set; }
    public required string Username { get; set; }
    public required DateOnly Birthday { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required bool RememberMe { get; set; }
}