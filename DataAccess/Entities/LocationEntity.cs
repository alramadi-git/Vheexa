namespace DataAccess.Entities;

public class LocationEntity
{
    public string UUID { get; set; }


    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }

    public float Latitude { get; set; }
    public float Longitude { get; set; }
}