namespace Database.Entities;

public class PartnerSettingsEntity
{
    public Guid UUID { get; set; }
    public Guid PartnerUUID { get; set; }
    public Guid Partner { get; set; }
    public bool ReceiveNews { get; set; }
}