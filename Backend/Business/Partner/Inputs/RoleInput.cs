namespace Business.Partner.Inputs;

public class ClsRoleCreateInput
{
    public required string Name { get => field.Trim(); set; }
    public required Database.Partner.Enums.PERMISSION[] Permissions { get; set; }
    public Database.Enums.STATUS Status { get; set; }
}

public class ClsRoleFilterInput
{
    public string? Name { get => field?.Trim(); set; }
    public required Database.Partner.Enums.PERMISSION[] Permissions { get; set; }
    public Database.Enums.STATUS? Status { get; set; }
}