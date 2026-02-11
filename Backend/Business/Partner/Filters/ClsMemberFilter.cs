namespace Business.Partner.Filters;

public class ClsMemberFilter
{
    public string? Search { get => field?.Trim(); set; }
    public Guid[] RoleUuids { get; set; } = [];
    public Guid[] BranchUuids { get; set; } = [];
    public Database.Enums.STATUS? Status { get; set; }
}