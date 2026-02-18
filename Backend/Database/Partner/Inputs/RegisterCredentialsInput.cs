using Database.Inputs;

namespace Database.Partner.Inputs;

public class ClsRegisterCredentialsInput
{
    public class ClsBranchInput
    {
        public required ClsLocationInput Location { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
    }
    public class ClsMemberInput
    {
        public required Guid Uuid { get; set; }
        public ClsImageInput? Avatar { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
    public required Guid Uuid { get; set; }
    public ClsImageInput? Logo { get; set; }
    public ClsImageInput? Banner { get; set; }
    public required string Handle { get; set; }
    public required string OrganizationName { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required bool RememberMe { get; set; }
    public required ClsBranchInput Branch { get; set; }
    public required ClsMemberInput Member { get; set; }
}