namespace DataAccess.ResponseDTOs;

public class SuccessManyResponseDTO<TData>
{
    public TData[] Data { get; set; }
    public PaginationResponseDTO Pagination { get; set; }

    public SuccessManyResponseDTO(TData[] data, PaginationResponseDTO pagination)
    {
        Data = data;
        Pagination = pagination;
    }
}