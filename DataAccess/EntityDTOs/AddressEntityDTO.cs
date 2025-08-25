using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class AddressDTOEntity
{
    public int ID { get; set; }

    public string URL { get; set; }

    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }

    public AddressDTOEntity(AddressEntity address)
    {
        ID = address.ID;

        URL = address.URL;

        Country = address.Country;
        City = address.City;
        Street = address.Street;
    }
}