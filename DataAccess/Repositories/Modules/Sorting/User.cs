using DataAccess.Repositories.Modules.Sorting.Abstractions;

namespace DataAccess.Repositories.Modules.Sorting;

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

public class User : BaseSorting<USER_OPTION>
{
    public User(USER_OPTION by = USER_OPTION.NON, bool ascending = true) : base(by, ascending) { }
}