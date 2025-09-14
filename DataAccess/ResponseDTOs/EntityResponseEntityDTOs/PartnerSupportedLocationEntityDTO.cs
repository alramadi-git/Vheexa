using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class PartnerSupportedLocationEntityDTO
{
    public int ID { get; set; }
    public int PartnerID { get; set; }

    public LocationEntityDTO Location { get; set; }

    public bool IsPickup { get; set; }
    public bool IsDropoff { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public PartnerSupportedLocationEntityDTO(PartnerSupportedLocationEntity partnerSupportedLocationEntity)
    {
        ID = partnerSupportedLocationEntity.ID;
        PartnerID = partnerSupportedLocationEntity.PartnerID;
        
        Location = new(partnerSupportedLocationEntity.Location!);

        IsPickup = partnerSupportedLocationEntity.IsPickup;
        IsDropoff = partnerSupportedLocationEntity.IsDropoff;

        IsPublished = partnerSupportedLocationEntity.IsPublished;

        IsDeleted = partnerSupportedLocationEntity.IsDeleted;
        DeletedAt = partnerSupportedLocationEntity.DeletedAt;

        UpdatedAt = partnerSupportedLocationEntity.UpdatedAt;
        CreatedAt = partnerSupportedLocationEntity.CreatedAt;
    }
}