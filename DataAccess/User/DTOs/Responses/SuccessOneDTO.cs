namespace DataAccess.User.DTOs.Responses;

public class SuccessOneDTO<TData>
{
    public TData Data { get; set; }

    public SuccessOneDTO(TData data)
    {
        Data = data;
    }
}