namespace DataAccess.Repositories.Modules.Filters;

public class Pagination
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 25;
}