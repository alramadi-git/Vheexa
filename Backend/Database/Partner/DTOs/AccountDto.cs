using Database.Partner.Enums;

namespace Database.Partner.Dtos;

public class ClsAccountDto
{
    public class ClsPartnerDto
    {
        public string? Logo { get; set; }
        public string? Banner { get; set; }
        public string Handle { get; set; }
        public string OrganizationName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public class ClsRoleDto
    {
        public string Name { get; set; }
        public PERMISSION[] Permissions { get; set; }
    }
    public class ClsBranchDto
    {
        public class ClsLocationDto
        {
            public string Country { get; set; }
            public string City { get; set; }
            public string Street { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
        public ClsLocationDto Location { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public ClsPartnerDto Partner { get; set; }
    public ClsRoleDto Role { get; set; }
    public string? Avatar { get; set; }
    public ClsBranchDto Branch { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
}