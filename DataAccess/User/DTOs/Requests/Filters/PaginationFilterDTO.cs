using Microsoft.EntityFrameworkCore;
namespace DataAccess.User.DTOs.Requests.Filters;

public enum PAGE_SIZE
{
    _5 = 5,
    _10 = 10,
    _25 = 25,
    _50 = 50,
    _75 = 75,
    _100 = 100
}

public class PaginationFilterDTO
{
    public int Page { get; set; } = 1;
    public PAGE_SIZE PageSize { get; set; } = PAGE_SIZE._10;

    public int Skip() { return Page - 1; }
    public int Take() { return (int)PageSize; }
}