namespace Database.Partner.Inputs;

public class ClsRegisterCredentialsInput
{
    public class ClsBranchCreateInput
    {
        public class ClsLocationCreateInput
        {
            public required string Country { get; set; }
            public required string City { get; set; }
            public required string Street { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
        public required ClsLocationCreateInput Location { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
    }
    public class ClsMemberCreateInput
    {
        public string? Avatar { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
    public string? Logo { get; set; }
    public string? Banner { get; set; }
    public required string Handle { get; set; }
    public required string OrganizationName { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required ClsBranchCreateInput Branch { get; set; }
    public required ClsMemberCreateInput Member { get; set; }
}