namespace Business.Partner.Filters;

public class ClsOptionPaginationFilter
{
    public int Page { get; set; }
}

public class ClsOptionFilterFilter
{
    public string? Search { get => field?.Trim(); set; }
}