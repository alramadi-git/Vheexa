namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class AddressUpdateRequestDTO
{
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }

    public required float Latitude { get; set; }
    public required float Longitude { get; set; }
}