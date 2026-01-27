using Database.Enums;

namespace Database.Partner.Parameters;

public class ClsBranchFilterParameter
{
    public string? Search { get; set; }
    public STATUS? Status { get; set; }
}