namespace DataAccess.Modules.Filters;

public class PaginationFilter
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 25;
}