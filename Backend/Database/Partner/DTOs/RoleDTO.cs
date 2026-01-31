using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Dtos;

public class ClsRoleDto
{
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public PERMISSION[] PermissionUuids { get; set; }
    public int AssignedCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}