namespace DataAccess.Repositories.Modules.Updates.Abstractions;

public class Address
{
    public required string URL { get; set; }

    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Street { get; set; }
}