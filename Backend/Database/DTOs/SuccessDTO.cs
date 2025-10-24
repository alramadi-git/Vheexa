namespace Database.DTOs;


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