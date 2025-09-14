using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class LocationEntityDTO
{
    public int ID { get; set; }

    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }

    public float Latitude { get; set; }
    public float Longitude { get; set; }

    public LocationEntityDTO(LocationEntity location)
    {
        ID = location.ID;

        Country = location.Country;
        City = location.City;
        Street = location.Street;

        Latitude = location.Latitude;
        Longitude = location.Longitude;
    }
}