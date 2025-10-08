using DataAccess.Entities;
namespace DataAccess.User.DTOs;

public class LocationDTO
{
    public string UUID { get; set; }

    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }

    public float Latitude { get; set; }
    public float Longitude { get; set; }


    public LocationDTO(LocationEntity locationEntity)
    {
        this.UUID = locationEntity.UUID;

        this.Country = locationEntity.Country;
        this.City = locationEntity.City;
        this.Street = locationEntity.Street;

        this.Latitude = locationEntity.Latitude;
        this.Longitude = locationEntity.Longitude;
    }
}