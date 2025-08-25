namespace DataAccess.RequestDTOs;

public enum USER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    FULL_NAME,
    AVERAGE_RATES,
    DATE_OF_BIRTH,
    DELETION,
    MODIFICATION,
}

public class UserSortingRequestDTO : AbstractSortingRequestDTO<USER_SORTING_OPTION_REQUEST_DTO>;