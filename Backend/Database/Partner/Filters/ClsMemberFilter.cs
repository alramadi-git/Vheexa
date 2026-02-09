using Database.Enums;

namespace Database.Partner.Filters;

public class ClsMemberFilter
{
    public string? Search { get; set; }
    public required Guid[] RoleUuids { get; set; }
    public required Guid[] BranchUuids { get; set; }
    public STATUS? Status { get; set; }
}