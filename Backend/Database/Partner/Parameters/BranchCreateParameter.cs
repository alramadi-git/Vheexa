namespace Database.Partner.Parameters;

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
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public ClsLocationCreateParameter Location { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public STATUS Status { get; set; }
}