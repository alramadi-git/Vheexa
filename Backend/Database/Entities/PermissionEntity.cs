using Database.Partner.Enums;

namespace Database.Entities;

public class ClsPermissionEntity
{
    public Guid Uuid { get; set; }
    public PERMISSION Type { get; set; }
    public bool IsAdmin { get; set; }
}