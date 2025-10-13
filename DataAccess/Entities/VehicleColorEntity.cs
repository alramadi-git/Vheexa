using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class VehicleColorEntity
{
    [Key]
    public Guid UUID { get; set; }
    
    public VehicleEntity Vehicle { get; set; }
    public Guid VehicleUUID { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}