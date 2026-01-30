namespace Database.Partner.Parameters;

public class ClsRegisterCredentialsParameter
{
    public class ClsBranchCreateParameter
    {
        public class ClsLocationCreateParameter
        {
            public string Country { get; set; }
            public string City { get; set; }
            public string Street { get; set; }
            public float Latitude { get; set; }
            public float Longitude { get; set; }
        }
        public ClsLocationCreateParameter Location { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public class ClsMemberCreateParameter
    {
        public string? Avatar { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public string? Logo { get; set; }
    public string? Banner { get; set; }
    public string Handle { get; set; }
    public string OrganizationName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public ClsBranchCreateParameter Branch { get; set; }
    public ClsMemberCreateParameter Member { get; set; }
}