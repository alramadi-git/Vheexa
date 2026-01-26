namespace Database.Partner.Dtos;

public class ClsRoleDto
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public class ClsPermissionDto
    {
        public Guid Uuid { get; set; }
        public string Name { get; set; }
    }
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public ClsPermissionDto[] Permissions { get; set; }
    public int AssignedCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}