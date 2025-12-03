namespace Database.Entities;

public class HistoryEntity
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
        VEHICLE_INSTANCES,
    }
    public Guid UUID { get; set; }
    public ACTION Action { get; set; }
    public ENTITY Entity { get; set; }
    public Guid EntityUUID { get; set; }
    public string Notes { get; set; }
}