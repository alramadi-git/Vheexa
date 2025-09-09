using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.FiltersRequestDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

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
        .ThenInclude(human => human!.Location)
        .Where((user) => user.ID == userID && user.IsDeleted == false);

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        return new(new(user));
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(UserFiltrationRequestDTO userFilters)
    {
        var usersQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Location)
        .AsQueryable();

        if (userFilters.FirstName != null) usersQuery = usersQuery.Where(user => user.Human!.FirstName.Contains(userFilters.FirstName));
        if (userFilters.MidName != null) usersQuery = usersQuery.Where(user => user.Human!.MidName.Contains(userFilters.MidName));
        if (userFilters.LastName != null) usersQuery = usersQuery.Where(user => user.Human!.LastName.Contains(userFilters.LastName));

        if (userFilters.Location != null)
        {
            if (userFilters.Location.Country != null) usersQuery = usersQuery.Where(user => user.Human!.Location!.Country.Contains(userFilters.Location.Country));
            if (userFilters.Location.City != null) usersQuery = usersQuery.Where(user => user.Human!.Location!.City.Contains(userFilters.Location.City));
            if (userFilters.Location.Street != null) usersQuery = usersQuery.Where(user => user.Human!.Location!.Street.Contains(userFilters.Location.Street));
        }

        if (userFilters.MinAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates >= userFilters.MinAverageRates);
        if (userFilters.MaxAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates <= userFilters.MaxAverageRates);

        if (userFilters.MinDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth >= userFilters.MinDateOfBirth);
        if (userFilters.MaxDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth <= userFilters.MaxDateOfBirth);

        if (userFilters.PhoneNumber != null) usersQuery = usersQuery.Where(user => user.Human!.PhoneNumber.Contains(userFilters.PhoneNumber));

        if (userFilters.Email != null) usersQuery = usersQuery.Where(user => user.Human!.Email.Contains(userFilters.Email));


        if (userFilters.IsDeleted == true)
        {
            usersQuery = usersQuery
            .Where(user => user.IsDeleted == userFilters.IsDeleted);
    
            if (userFilters.DeletedAt != null) usersQuery = usersQuery.Where(user => user.DeletedAt == userFilters.DeletedAt);
            else
            {
                if (userFilters.DeletedBefore != null) usersQuery = usersQuery.Where(user => user.DeletedAt <= userFilters.DeletedBefore);
                if (userFilters.DeletedAfter != null) usersQuery = usersQuery.Where(user => user.DeletedAt >= userFilters.DeletedAfter);
            }
        }

        if (userFilters.UpdatedAt != null) usersQuery = usersQuery.Where(user => user.UpdatedAt == userFilters.UpdatedAt);
        else
        {
            if (userFilters.UpdatedBefore != null) usersQuery = usersQuery.Where(user => user.UpdatedAt <= userFilters.UpdatedBefore);
            if (userFilters.UpdatedAfter != null) usersQuery = usersQuery.Where(user => user.UpdatedAt >= userFilters.UpdatedAfter);
        }

        if (userFilters.CreatedAt != null) usersQuery = usersQuery.Where(user => user.CreatedAt == userFilters.CreatedAt);
        else
        {
            if (userFilters.CreatedBefore != null) usersQuery = usersQuery.Where(user => user.CreatedAt <= userFilters.CreatedBefore);
            if (userFilters.CreatedAfter != null) usersQuery = usersQuery.Where(user => user.CreatedAt >= userFilters.CreatedAfter);
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