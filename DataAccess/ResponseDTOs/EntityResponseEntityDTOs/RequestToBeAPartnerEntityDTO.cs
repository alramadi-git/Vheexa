using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class RequestToBeAPartnerEntityDTO
{
    public int ID { get; set; }
    public int PartnerID { get; set; }

    public REQUEST_TO_BE_A_PARTNER_STATUS  Status { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public RequestToBeAPartnerEntityDTO(RequestToBeAPartnerEntity requestToBeAPartner)
    {
        ID = requestToBeAPartner.ID;
        PartnerID = requestToBeAPartner.PartnerID;
        
        Status = requestToBeAPartner.Status;

        UpdatedAt = requestToBeAPartner.UpdatedAt;
        CreatedAt = requestToBeAPartner.CreatedAt;
    }
}