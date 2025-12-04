using Database.Entities;

namespace Database.DTOs.Generals;

public class ClsLocationDTO
{
    public Guid UUID { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public ClsLocationDTO(LocationEntity locationEntity)
    {
        UUID = locationEntity.UUID;
        Country = locationEntity.Country;
        City = locationEntity.City;
        Street = locationEntity.Street;
        Latitude = locationEntity.Latitude;
        Longitude = locationEntity.Longitude;
    }
}