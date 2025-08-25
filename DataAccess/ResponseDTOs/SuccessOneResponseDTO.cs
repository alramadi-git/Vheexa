namespace DataAccess.ResponseDTOs;

public class SuccessOneResponseDTO<TData>
{
    public TData Data { get; set; }

    public SuccessOneResponseDTO(TData data)
    {
        Data = data;
    }
}