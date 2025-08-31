using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminUserRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminUserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> GetAsync(int userID)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .Where((user) => user.ID == userID && user.IsDeleted == false);

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        return new(new(user));
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(GetManyUsersSettingsRequestDTO userFilters)
    {
        var usersQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsQueryable();

        if (userFilters.Filters.FirstName != null) usersQuery = usersQuery.Where(user => user.Human!.FirstName.Contains(userFilters.Filters.FirstName));
        if (userFilters.Filters.MidName != null) usersQuery = usersQuery.Where(user => user.Human!.MidName.Contains(userFilters.Filters.MidName));
        if (userFilters.Filters.LastName != null) usersQuery = usersQuery.Where(user => user.Human!.LastName.Contains(userFilters.Filters.LastName));

        if (userFilters.Filters.Address != null)
        {
            if (userFilters.Filters.Address.Country != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Country.Contains(userFilters.Filters.Address.Country));
            if (userFilters.Filters.Address.City != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.City.Contains(userFilters.Filters.Address.City));
            if (userFilters.Filters.Address.Street != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Street.Contains(userFilters.Filters.Address.Street));
        }

        if (userFilters.Filters.MinAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates >= userFilters.Filters.MinAverageRates);
        if (userFilters.Filters.MaxAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates <= userFilters.Filters.MaxAverageRates);

        if (userFilters.Filters.MinDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth >= userFilters.Filters.MinDateOfBirth);
        if (userFilters.Filters.MaxDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth <= userFilters.Filters.MaxDateOfBirth);

        if (userFilters.Filters.PhoneNumber != null) usersQuery = usersQuery.Where(user => user.Human!.PhoneNumber.Contains(userFilters.Filters.PhoneNumber));

        if (userFilters.Filters.Email != null) usersQuery = usersQuery.Where(user => user.Human!.Email.Contains(userFilters.Filters.Email));

        usersQuery = usersQuery
        .Where(user => user.IsDeleted == userFilters.Filters.IsDeleted);

        if (userFilters.Filters.IsDeleted == true)
        {
            if (userFilters.Filters.DeletedAt != null) usersQuery = usersQuery.Where(user => user.DeletedAt == userFilters.Filters.DeletedAt);
            else
            {
                if (userFilters.Filters.DeletedBefore != null) usersQuery = usersQuery.Where(user => user.DeletedAt <= userFilters.Filters.DeletedBefore);
                if (userFilters.Filters.DeletedAfter != null) usersQuery = usersQuery.Where(user => user.DeletedAt >= userFilters.Filters.DeletedAfter);
            }
        }

        if (userFilters.Filters.UpdatedAt != null) usersQuery = usersQuery.Where(user => user.UpdatedAt == userFilters.Filters.UpdatedAt);
        else
        {
            if (userFilters.Filters.UpdatedBefore != null) usersQuery = usersQuery.Where(user => user.UpdatedAt <= userFilters.Filters.UpdatedBefore);
            if (userFilters.Filters.UpdatedAfter != null) usersQuery = usersQuery.Where(user => user.UpdatedAt >= userFilters.Filters.UpdatedAfter);
        }

        if (userFilters.Filters.CreatedAt != null) usersQuery = usersQuery.Where(user => user.CreatedAt == userFilters.Filters.CreatedAt);
        else
        {
            if (userFilters.Filters.CreatedBefore != null) usersQuery = usersQuery.Where(user => user.CreatedAt <= userFilters.Filters.CreatedBefore);
            if (userFilters.Filters.CreatedAfter != null) usersQuery = usersQuery.Where(user => user.CreatedAt >= userFilters.Filters.CreatedAfter);
        }

        var usersTotalFoundRecords = await usersQuery.CountAsync();

        if (userFilters.Sorting.Ascending == true)
        {
            switch (userFilters.Sorting.By)
            {
                case USER_SORTING_OPTION_REQUEST_DTO.FULL_NAME:
                    usersQuery = usersQuery
                    .OrderBy(user => user.Human!.FirstName)
                    .ThenBy(user => user.Human!.MidName)
                    .ThenBy(user => user.Human!.LastName);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.AVERAGE_RATES:
                    usersQuery = usersQuery.OrderBy(user => user.AverageRates);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.DATE_OF_BIRTH:
                    usersQuery = usersQuery.OrderBy(user => user.Human!.DateOfBirth);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    usersQuery = usersQuery.OrderBy(user => user.UpdatedAt);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.DELETION:
                    usersQuery = usersQuery.OrderBy(user => user.UpdatedAt);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    usersQuery = usersQuery.OrderBy(user => user.CreatedAt);
                    break;
            }
        }
        else
        {
            switch (userFilters.Sorting.By)
            {
                case USER_SORTING_OPTION_REQUEST_DTO.FULL_NAME:
                    usersQuery = usersQuery
                    .OrderByDescending(user => user.Human!.FirstName)
                    .ThenByDescending(user => user.Human!.MidName)
                    .ThenByDescending(user => user.Human!.LastName);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.AVERAGE_RATES:
                    usersQuery = usersQuery.OrderByDescending(user => user.AverageRates);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.DATE_OF_BIRTH:
                    usersQuery = usersQuery.OrderByDescending(user => user.Human!.DateOfBirth);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.DELETION:
                    usersQuery = usersQuery.OrderByDescending(user => user.UpdatedAt);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    usersQuery = usersQuery.OrderByDescending(user => user.UpdatedAt);
                    break;

                case USER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    usersQuery = usersQuery.OrderByDescending(user => user.CreatedAt);
                    break;
            }
        }

        usersQuery = usersQuery
        .Skip(userFilters.Pagination.RequestedPage)
        .Take((int)userFilters.Pagination.RecordsPerRequest);

        var users = await usersQuery
        .AsNoTracking()
        .Select(user => new UserEntityDTO(user)).ToArrayAsync();

        return new(
            users,
            new(usersTotalFoundRecords, userFilters.Pagination.RecordsPerRequest, userFilters.Pagination.RequestedPage)
        );
    }
};