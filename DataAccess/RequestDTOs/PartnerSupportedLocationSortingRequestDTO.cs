using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace DataAccess.RequestDTOs;

public enum PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    PUBLICATION,
    DROPOFF,
    PICKUP,
    ADDRESS,
    PARTNER_ID,
}

public class PartnerSupportedLocationSortingRequestDTO : AbstractSortingFiltersRequestDTO<PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO>;