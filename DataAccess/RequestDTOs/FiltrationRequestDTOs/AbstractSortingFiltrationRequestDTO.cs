namespace DataAccess.RequestDTOs.FiltersRequestDTOs;

public abstract class AbstractSortingFiltrationRequestDTO<TOption> where TOption : Enum
{
    public required TOption By { get; set; }
    public required bool Ascending { get; set; }
}