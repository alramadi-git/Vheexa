using Database.Enums;

namespace Database.Partner.Filters;

public class ClsMemberFilter
{
    public string? Search { get; set; }
    public Guid[] RoleUuids { get; set; } = [];
    public Guid[] BranchUuids { get; set; } = [];
    public STATUS? Status { get; set; }
}