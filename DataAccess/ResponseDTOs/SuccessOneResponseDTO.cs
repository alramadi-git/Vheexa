namespace DataAccess.ResponseDTOs;

public class SuccessResponseDTO<TData>
{
    public TData Data { get; set; }

    public SuccessResponseDTO(TData data)
    {
        Data = data;
    }
}