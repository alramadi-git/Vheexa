namespace Business.Inputs;

public class ClsLocationInput
{
    public required string Country { get => field.Trim(); set; }
    public required string City { get => field.Trim(); set; }
    public required string Street { get => field.Trim(); set; }
    public required double Latitude { get; set; }
    public required double Longitude { get; set; }
}