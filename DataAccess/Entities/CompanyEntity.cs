namespace DataAccess.Entities;

public class CompanyEntity
{
    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public ImageEntity? Image { get; set; }
    public int ImageID { get; set; }

    public required string Name { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
    public required string Password { get; set; }
}