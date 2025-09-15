namespace DataAccess.Entities;

public class ColorEntity
{
    public int ID { get; set; }

    public required string Name { get; set; }
    public required string HexCode { get; set; }
}