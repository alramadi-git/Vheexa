namespace DataAccess.RequestDTOs.FiltersRequestDTOs;
public enum PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    PUBLICATION,
    DROPOFF,
    PICKUP,
    LOCATION,
    PARTNER_ID,
}

public class PartnerSupportedLocationsSortingRequestDTO : AbstractSortingFiltersRequestDTO<PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO>;

public class PartnerSupportedLocationFiltrationRequestDTO
: AbstractFiltersRequestDTO<PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO>
{
    public bool? IsPickup { get; set; }
    public bool? IsDropoff { get; set; }

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