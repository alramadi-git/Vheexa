using Database.Enums;

namespace Database.Partner.Models;

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
    public Guid Uuid { get; set; }
    public ClsLocationModel Location { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public int MemberCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}