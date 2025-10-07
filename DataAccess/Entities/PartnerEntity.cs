namespace DataAccess.Entities;

public class PartnerEntity
{
    public string UUID { get; set; }

    public ImageEntity Logo { get; set; }
    public int LogoUUID { get; set; }

    public ImageEntity Banner { get; set; }
    public int BannerUUID { get; set; }

    public string Handle { get; set; }

    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}