namespace Database.Entities;

public class RolePermissionEntity
{
    public Guid UUID { get; set; }
    public Guid RoleUUID { get; set; }
    public RoleEntity Role { get; set; }
    public Guid PermissionUUID { get; set; }
    public PermissionEntity Permission { get; set; }
}