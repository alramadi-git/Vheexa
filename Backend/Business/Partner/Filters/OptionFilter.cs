namespace Business.Partner.Filters;

public class ClsOptionPaginationFilter
{
    public int Page { get; set; } = 1;
}

public class ClsOptionFilterFilter
{
    public string? Search { get => field?.Trim(); set; }
}