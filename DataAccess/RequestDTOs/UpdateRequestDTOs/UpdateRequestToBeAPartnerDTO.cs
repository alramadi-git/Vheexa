using DataAccess.Entities;

namespace DataAccess.RequestDTOs.UpdateRequestDTOs;

public class RequestToBeAPartnerUpdateRequestDTO
{
    public required REQUEST_TO_BE_A_PARTNER_STATUS Status { get; set; }
}