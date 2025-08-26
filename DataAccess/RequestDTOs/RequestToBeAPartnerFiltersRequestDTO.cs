using DataAccess.Entities;

namespace DataAccess.RequestDTOs;

public class RequestToBeAPartnerFiltersRequestDTO
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