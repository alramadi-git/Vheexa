namespace DataAccess.User.DTOs.Responses;

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