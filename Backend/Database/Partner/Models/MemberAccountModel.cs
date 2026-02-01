using Database.Partner.Enums;

namespace Database.Partner.Models;

public class ClsMemberAccountModel
{
    public class ClsPartnerModel
    {
        public Guid Uuid { get; set; }
        public string? Logo { get; set; }
        public string? Banner { get; set; }
        public string Handle { get; set; }
        public string OrganizationName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public class ClsRoleModel
    {
        public string Name { get; set; }
        public PERMISSION[] Permissions { get; set; }
    }
    public class ClsBranchModel
    {
        public class ClsLocationModel
        {
            public string Country { get; set; }
            public string City { get; set; }
            public string Street { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
        public ClsLocationModel Location { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public Guid Uuid { get; set; }
    public ClsPartnerModel Partner { get; set; }
    public ClsRoleModel Role { get; set; }
    public string? Avatar { get; set; }
    public ClsBranchModel Branch { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
}