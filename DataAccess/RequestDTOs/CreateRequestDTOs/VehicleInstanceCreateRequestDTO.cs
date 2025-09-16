namespace DataAccess.RequestDTOs.CreateRequestDTOs;

public class VehicleInstanceCreateRequestDTO
{
    public int ID { get; set; }

    public required ColorCreateRequestDTO Color { get; set; }

    public int InStock { get; set; }
    public int InUse { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}