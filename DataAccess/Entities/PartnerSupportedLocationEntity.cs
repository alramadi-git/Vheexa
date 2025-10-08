namespace DataAccess.Entities;

public class PartnerSupportedLocationEntity
{

    public string UUID { get; set; }

    public PartnerEntity Partner { get; set; }
    public string PartnerUUID { get; set; }

    public LocationEntity Location { get; set; }
    public string LocationUUID { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}