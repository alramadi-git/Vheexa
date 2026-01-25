namespace Database.Partner.DTOs;

public class ClsRoleDTO
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public class ClsPermissionDTO
    {
        public Guid Uuid { get; set; }
        public string Name { get; set; }
    }
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public ClsPermissionDTO[] Permissions { get; set; }
    public int AssignedCount { get; set; }
    public STATUS Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}