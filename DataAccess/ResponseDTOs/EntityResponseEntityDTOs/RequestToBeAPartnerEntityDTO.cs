using DataAccess.Entities;
using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class RequestToBeAPartnerEntityDTO
{
    public int ID { get; set; }
    public int PartnerID { get; set; }

    public RECORDS_PER_REQUEST_OPTION_REQUEST_DTO Status { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public RequestToBeAPartnerEntityDTO(RequestToBeAPartnerEntity requestToBeAPartner)
    {
        ID = requestToBeAPartner.ID;
        PartnerID = requestToBeAPartner.PartnerID;
        
        Status = (RECORDS_PER_REQUEST_OPTION_REQUEST_DTO)requestToBeAPartner.Status;

        UpdatedAt = requestToBeAPartner.UpdatedAt;
        CreatedAt = requestToBeAPartner.CreatedAt;
    }
}