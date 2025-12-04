using Database.DTOs.Generals;
using Database.Entities;

namespace Database.DTOs.User;

public class ClsBranchDTO
{
    public Guid UUID { get; set; }
    public ClsLocationDTO Location { get; set; }
    public BranchEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public ClsBranchDTO(BranchEntity branchEntity)
    {
        UUID = branchEntity.UUID;
        Location = new ClsLocationDTO(branchEntity.Location);
        Status = branchEntity.Status;
        UpdatedAt = branchEntity.UpdatedAt;
        CreatedAt = branchEntity.CreatedAt;
    }
}