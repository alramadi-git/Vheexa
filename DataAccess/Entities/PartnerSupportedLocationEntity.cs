using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class PartnerSupportedLocationEntity
{
    [Key]
    public Guid UUID { get; set; }

    public PartnerEntity Partner { get; set; }
    public Guid PartnerUUID { get; set; }

    public LocationEntity Location { get; set; }
    public Guid LocationUUID { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}