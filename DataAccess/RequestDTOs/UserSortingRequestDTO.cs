using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace DataAccess.RequestDTOs;

public enum USER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    DELETION,
    AVERAGE_RATES,
    DATE_OF_BIRTH,
    FULL_NAME,
}

public class UserSortingRequestDTO : AbstractSortingFiltersRequestDTO<USER_SORTING_OPTION_REQUEST_DTO>;