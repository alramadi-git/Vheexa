namespace DataAccess.RequestDTOs;

public abstract class AbstractSortingRequestDTO<TOption> where TOption : Enum
{
    public required TOption By { get; set; }
    public required bool Ascending { get; set; }
}