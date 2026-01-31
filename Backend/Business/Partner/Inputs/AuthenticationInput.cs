using Microsoft.AspNetCore.Http;

namespace Business.Partner.Inputs;

public class ClsRegisterCredentialsInput
{
    public class ClsBranchInput
    {
        public class ClsLocationInput
        {
            public required string Country { get => field.Trim(); set; }
            public required string City { get => field.Trim(); set; }
            public required string Street { get => field.Trim(); set; }
            public required double Latitude { get; set; }
            public required double Longitude { get; set; }
        }
        public required ClsLocationInput Location { get; set; }
        public required string Name { get => field.Trim(); set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
    }
    public class ClsMemberInput
    {
        public IFormFile? Avatar { get; set; }
        public required string Username { get => field.Trim(); set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
    public IFormFile? Logo { get; set; }
    public IFormFile? Banner { get; set; }
    public required string Handle { get => field.Trim(); set; }
    public required string OrganizationName { get => field.Trim(); set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required ClsBranchInput Branch { get; set; }
    public required ClsMemberInput Member { get; set; }
}