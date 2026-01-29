namespace Database.Dtos;

public class ClsPaginatedDto<TData>
{
    public class ClsPaginationDto
    {
        public int Page { get; init; }
        public int PageSize { get; init; }
        public int TotalItems { get; init; }
    }
    public TData[] Data { get; set; }
    public ClsPaginationDto Pagination { get; set; }
}

