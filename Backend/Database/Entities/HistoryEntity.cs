namespace Database.Entities;

public class ClsHistoryEntity
{
    public enum ACTION
    {
        CREATE,
        UPDATE,
        DELETE
    }
    public enum ENTITY
    {
        PARTNERS,
        PARTNER_ROLES,
        BRANCHES,
        MEMBERS,
        VEHICLE_MODELS,
    }
    public Guid Uuid { get; set; }
    public ACTION Action { get; set; }
    public ENTITY Entity { get; set; }
    public Guid EntityUuid { get; set; }
}