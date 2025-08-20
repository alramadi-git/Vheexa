namespace API.DTOs.Helpers;

public class ImageAddDTO
{
    public required string URL;
    public required string Alternate;
}

public class ImageDTO
{
    public int ID;

    public required string URL;
    public required string Alternate;
}

public class ImageUpdateDTO
{
    public required string URL;
    public required string Alternate;
}