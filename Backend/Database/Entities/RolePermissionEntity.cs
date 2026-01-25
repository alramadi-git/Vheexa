namespace Database.Entities;

public class ClsRolePermissionEntity
{
    public Guid Uuid { get; set; }
    public Guid RoleUuid { get; set; }
    public ClsRoleEntity Role { get; set; }
    public Guid PermissionUuid { get; set; }
    public ClsPermissionEntity Permission { get; set; }
}

