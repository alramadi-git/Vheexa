using DataAccess.Entities;

namespace DataAccess.RequestDTOs;

public class UpdateRequestToBeAPartnerDTO
{
    public int ID { get; set; }
    public REQUEST_TO_BE_A_PARTNER_STATUS Status { get; set; }
}