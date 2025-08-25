namespace DataAccess.RequestDTOs;

public class AddressUpdateRequestDTO
{
    public required string URL { get; set; }

    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }
}