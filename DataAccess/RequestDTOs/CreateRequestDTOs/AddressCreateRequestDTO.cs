namespace DataAccess.RequestDTOs.CreateRequestDTOs;

public class AddressCreateRequestDTO
{
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }

    public required float Latitude { get; set; }
    public required float Longitude { get; set; }
}