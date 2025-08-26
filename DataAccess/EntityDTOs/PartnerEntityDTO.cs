using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class PartnerEntityDTO
{
    public string Handle { get; set; }
    public float AverageRates { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public PartnerEntityDTO(PartnerEntity partner)
    {
        Handle = partner.Handle;

        AverageRates = partner.AverageRates;

        IsPublished = partner.IsPublished;

        IsDeleted = partner.IsDeleted;
        DeletedAt = partner.DeletedAt;

        UpdatedAt = partner.UpdatedAt;
        CreatedAt = partner.CreatedAt;
    }
}