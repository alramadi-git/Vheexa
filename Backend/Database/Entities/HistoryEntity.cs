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
        PARTNER_ROLES,
        PARTNER_SUPPORTED_LOCATIONS,
        MEMBERS,
        VEHICLES,
        VEHICLES_INSTANCES,
        VEHICLES_INSTANCES_SUPPORTED_LOCATIONS,

    }

    public Guid UUID { get; set; }
    public ACTION Action { get; set; }
    public ENTITY Entity { get; set; }
    public Guid EntityUUID { get; set; }
}