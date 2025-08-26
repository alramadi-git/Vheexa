namespace DataAccess.RequestDTOs;

public enum REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    STATUS,
    PARTNER_ID
}

public class RequestToBeAPartnerSortingRequestDTO : AbstractSortingRequestDTO<REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO>;