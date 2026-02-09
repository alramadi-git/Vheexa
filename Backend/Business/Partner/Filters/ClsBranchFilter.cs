namespace Business.Partner.Filters;

public class ClsBranchFilter
{
    public string? Search { get => field?.Trim(); set; }
    public Database.Enums.STATUS? Status { get; set; }
}