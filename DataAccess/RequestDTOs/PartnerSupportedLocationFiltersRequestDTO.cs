namespace DataAccess.RequestDTOs;

public class PartnerSupportedLocationFiltersRequestDTO
{
    public int? PartnerID { get; set; }

    public AddressFiltersRequestDTO? AddressID { get; set; }

    public required bool IsPickup { get; set; }
    public required bool IsDropoff { get; set; }
    
    public required bool IsPublished { get; set; }
    public required bool IsDeleted { get; set; }

    public DateTime? DeletedBefore { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? DeletedAfter { get; set; }

    public DateTime? UpdatedBefore { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? UpdatedAfter { get; set; }

    public DateTime? CreatedBefore { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? CreatedAfter { get; set; }
}