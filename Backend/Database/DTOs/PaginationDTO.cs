namespace Database.DTOs;

public class PaginationDTO
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalItems { get; set; }


    public PaginationDTO(int page, int pageSize, int totalItems)
    {
        Page = page;
        PageSize = pageSize;
        TotalItems = totalItems;
    }
}