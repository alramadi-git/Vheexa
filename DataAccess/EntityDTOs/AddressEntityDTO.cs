using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class AddressEntityDTO
{
    public int ID { get; set; }

    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }

    public float Latitude { get; set; }
    public float Longitude { get; set; }

    public AddressEntityDTO(AddressEntity address)
    {
        ID = address.ID;

        Country = address.Country;
        City = address.City;
        Street = address.Street;

        Latitude = address.Latitude;
        Longitude = address.Longitude;
    }
}