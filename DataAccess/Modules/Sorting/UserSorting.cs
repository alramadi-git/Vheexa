using DataAccess.Modules.Sorting.Abstractions;

namespace DataAccess.Modules.Sorting;

public enum USER_OPTION
{
    NON,
    FULL_NAME,
    AVERAGE_RATES,
    DATE_OF_BIRTH,
    DELETION,
    MODIFICATION,
    CREATION,
}

public class UserSorting : BaseSorting<USER_OPTION>
{
    public UserSorting(USER_OPTION by = USER_OPTION.NON, bool ascending = true) : base(by, ascending) { }
}