namespace Database.Models;

public class ClsPaginatedModel<TData>
{
    public class ClsPaginationModel
    {
        public int Page { get; init; }
        public int PageSize { get; init; }
        public int TotalItems { get; init; }
    }
    public TData[] Data { get; set; }
    public ClsPaginationModel Pagination { get; set; }
}

