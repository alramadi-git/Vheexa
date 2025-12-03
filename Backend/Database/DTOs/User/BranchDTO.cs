using Database.Entities;

namespace Database.DTOs;

public class BranchDTO
{
    public Guid UUID { get; set; }
    public LocationDTO Location { get; set; }
    public BranchEntity.STATUS Status { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public BranchDTO(BranchEntity branchEntity)
    {
        UUID = branchEntity.UUID;
        Location = new LocationDTO(branchEntity.Location);
        Status = branchEntity.Status;
        UpdatedAt = branchEntity.UpdatedAt;
        CreatedAt = branchEntity.CreatedAt;
    }
}