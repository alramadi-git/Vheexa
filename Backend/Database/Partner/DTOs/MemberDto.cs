using Database.Enums;

namespace Database.Partner.Dtos;

public class ClsMemberDto
{
    public class ClsRoleDto
    {
        public string Name { get; set; }
        public string[] Permissions { get; set; }
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
    public Guid Uuid { get; set; }
    public string? Avatar { get; set; }
    public ClsRoleDto Role { get; set; }
    public ClsBranchDto Branch { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}