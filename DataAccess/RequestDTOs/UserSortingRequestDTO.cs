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

public class UserSortingRequestDTO : AbstractSortingRequestDTO<USER_SORTING_OPTION_REQUEST_DTO>;