namespace DataAccess.Entities;

public class PartnerSupportedLocationEntity
{

    public int ID { get; set; }

    public PartnerEntity? Partner { get; set; }
    public int PartnerID { get; set; }

    public AddressEntity? Address { get; set; }
    public int AddressID { get; set; }

    public bool IsPickup { get; set; }
    public bool IsDropoff { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}