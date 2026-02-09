namespace Database.Inputs;

public class ClsLocationInput
{
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}