using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Models;

public class ClsMemberModel
{
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
    public string? Avatar { get; set; }
    public ClsRoleModel Role { get; set; }
    public ClsBranchModel Branch { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}