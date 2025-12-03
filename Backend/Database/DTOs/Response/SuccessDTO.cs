namespace Database.DTOs.Response;

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

public class SuccessOneDTO<TData>
{
    public TData Data { get; set; }

    public SuccessOneDTO(TData data)
    {
        Data = data;
    }
}

public class SuccessManyDTO<TData>
{
    public TData[] Data { get; set; }
    public PaginationDTO Pagination { get; set; }

    public SuccessManyDTO(TData[] data, PaginationDTO pagination)
    {
        Data = data;
        Pagination = pagination;
    }
}