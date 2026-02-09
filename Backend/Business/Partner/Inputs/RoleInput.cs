namespace Business.Partner.Inputs;

public class ClsRoleInput
{
    public required string Name { get => field.Trim(); set; }
    public required Database.Partner.Enums.PERMISSION[] Permissions { get; set; }
    public Database.Enums.STATUS Status { get; set; }
}
