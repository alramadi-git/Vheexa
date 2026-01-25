namespace Database.DTOs;

public class ClsPaginationFilterDTO
{
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class ClsPaginatedDTO<TData>
{
    public class ClsPaginationDTO
    {
        public int Page { get; init; }
        public int PageSize { get; init; }
        public int TotalItems { get; init; }
        public ClsPaginationDTO(int page, int pageSize, int totalItems)
        {
            Page = page;
            PageSize = pageSize;
            TotalItems = totalItems;
        }
    }
    public TData[] Data { get; set; }
    public ClsPaginationDTO Pagination { get; set; }
    public ClsPaginatedDTO(TData[] data, ClsPaginationDTO pagination)
    {
        Data = data;
        Pagination = pagination;
    }
}

