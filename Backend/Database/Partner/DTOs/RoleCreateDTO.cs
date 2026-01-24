namespace Database.Partner.DTOs;

public class ClsRoleCreateDTO
{
    public enum PERMISSION
    {
        PARTNER_READ,
        PARTNER_UPDATE,
        PARTNER_DELETE,
        ROLES_CREATE,
        ROLES_READ,
        ROLES_UPDATE,
        ROLES_DELETE,
        BRANCHES_CREATE,
        BRANCHES_READ,
        BRANCHES_UPDATE,
        BRANCHES_DELETE,
        MEMBERS_CREATE,
        MEMBERS_READ,
        MEMBERS_UPDATE,
        MEMBERS_DELETE,
        VEHICLE_MODELS_CREATE,
        VEHICLE_MODELS_READ,
        VEHICLE_MODELS_UPDATE,
        VEHICLE_MODELS_DELETE,
    }
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public string Name { get; set; }
    public PERMISSION[] Permissions { get; set; }
    public STATUS Status { get; set; }
}