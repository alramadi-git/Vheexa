using Database.Enums;

namespace Database.Entities;

public class ClsHistoryEntity
{
 
    public Guid Uuid { get; set; }
    public HISTORY_ACTION Action { get; set; }
    public HISTORY_ENTITY Entity { get; set; }
    public Guid EntityUuid { get; set; }
}