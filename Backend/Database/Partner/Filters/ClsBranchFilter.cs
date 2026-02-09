using Database.Enums;

namespace Database.Partner.Filters;

public class ClsBranchFilter
{
    public string? Search { get; set; }
    public STATUS? Status { get; set; }
}