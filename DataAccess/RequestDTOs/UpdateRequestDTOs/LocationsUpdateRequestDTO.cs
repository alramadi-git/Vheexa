namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class LocationUpdateRequestDTO
{
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }

    public  float Latitude { get; set; }
    public  float Longitude { get; set; }
}