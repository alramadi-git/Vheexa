namespace Business.Partner.Inputs;

public class ClsBranchCreateInput
{
    public class ClsLocationCreateInput
    {
        public required string Country { get => field.Trim(); set; }
        public required string City { get => field.Trim(); set; }
        public required string Street { get => field.Trim(); set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
    public required ClsLocationCreateInput Location { get; set; }
    public required string Name { get => field.Trim(); set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public Database.Enums.STATUS Status { get; set; }
}

public class ClsBranchFilterInput
{
    public string? Search { get => field?.Trim(); set; }
    public Database.Enums.STATUS? Status { get; set; }
}