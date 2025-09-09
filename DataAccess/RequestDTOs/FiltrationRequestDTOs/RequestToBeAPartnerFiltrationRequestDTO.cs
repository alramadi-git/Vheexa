using DataAccess.Entities;

namespace DataAccess.RequestDTOs.FiltersRequestDTOs;

public enum REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    STATUS,
    PARTNER_ID
}

public class RequestToBeAPartnerSortingRequestDTO : AbstractSortingFiltrationRequestDTO<REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO>;

public class RequestToBeAPartnerFiltrationRequestDTO : AbstractFiltrationRequestDTO<REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO>
{

    public int? PartnerID { get; set; }

    public REQUEST_TO_BE_A_PARTNER_STATUS? Status { get; set; }

    public DateTime? UpdatedBefore { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? UpdatedAfter { get; set; }

    public DateTime? CreatedBefore { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? CreatedAfter { get; set; }
}