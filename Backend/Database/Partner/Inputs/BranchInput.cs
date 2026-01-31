using Database.Enums;

namespace Database.Partner.Inputs;

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
    public STATUS Status { get; set; }
}

public class ClsBranchFilterInput
{
    public string? Search { get; set; }
    public STATUS? Status { get; set; }
}