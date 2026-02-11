using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Models;

public class ClsRoleModel
{
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public PERMISSION[] Permissions { get; set; }
    public int AssignedCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}