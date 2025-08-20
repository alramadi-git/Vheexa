namespace API.DTOs.Helpers;

public class AddressAddDTO
{
    public required string URL;

    public required string Country;
    public required string City;
    public required string Street;
}

public class AddressDTO
{
    public int ID;

    public required string URL;

    public required string Country;
    public required string City;
    public required string Street;
}

public class AddressUpdateDTO
{
    public required string URL;

    public required string Country;
    public required string City;
    public required string Street;
}