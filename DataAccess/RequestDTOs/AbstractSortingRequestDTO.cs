namespace DataAccess.RequestDTOs;

public abstract class AbstractSortingRequestDTO<TOption> where TOption : Enum
{
    public TOption By { get; set; } = default!;
    public bool Ascending { get; set; } = true;
}