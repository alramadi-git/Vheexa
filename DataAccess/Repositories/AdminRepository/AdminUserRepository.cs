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

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync();
        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        return new(new(user));
    }

    public async Task UpdateAsync(int adminID, int userID, UserUpdateRequestDTO userUpdatedData)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .Where((user) => user.ID == userID);

        var user = await userQuery.FirstOrDefaultAsync();
        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        var image = user.Human!.Image;
        var address = user.Human.Address!;

        if (image != null)
        {
            if (userUpdatedData.Image == null)
            {
                _AppDBContext.Images.Remove(image);
                user.Human.Image = null;
            }
            else
            {
                image.URL = userUpdatedData.Image.URL;
                image.Alternate = userUpdatedData.Image.Alternate;
            }
        }

        address.URL = userUpdatedData.Address.URL;
        address.Country = userUpdatedData.Address.Country;
        address.City = userUpdatedData.Address.City;
        address.Street = userUpdatedData.Address.Street;

        user.Human.FirstName = userUpdatedData.FirstName;
        user.Human.MidName = userUpdatedData.MidName;
        user.Human.LastName = userUpdatedData.LastName;

        user.Human.DateOfBirth = userUpdatedData.DateOfBirth;

        user.Human.PhoneNumber = userUpdatedData.PhoneNumber;

        user.Human.Email = userUpdatedData.Email;

        user.UpdatedAt = DateTime.UtcNow;

        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.ID == adminID);

        var admin = await adminQuery.FirstOrDefaultAsync();
        if (admin == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such admin.");

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(
        new Entities.TaskEntity
        {
            Action = Entities.TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = Entities.TASK_TABLE_OPTION_ENTITY.USERS,
            RowID = userID,
        });

        var adminTaskEntityEntry = _AppDBContext.AdminTasks
        .Add(
        new Entities.AdminTaskEntity
        {
            Admin = admin,
            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.UtcNow,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int adminID, int userID)
    {
        var userQuery = _AppDBContext.Users
        .Where((user) => user.ID == userID && user.IsDeleted == false);

        var user = await userQuery.FirstOrDefaultAsync();

        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");
        if (user.IsDeleted == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "User is already deleted.");

        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;

        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.ID == adminID);

        var admin = await adminQuery.FirstOrDefaultAsync();
        if (admin == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such admin.");

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(
        new Entities.TaskEntity
        {
            Action = Entities.TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = Entities.TASK_TABLE_OPTION_ENTITY.REQUESTS_TO_BE_A_PARTNER,
            RowID = userID,
        });

        var adminTaskEntityEntry = _AppDBContext.AdminTasks
        .Add(
        new Entities.AdminTaskEntity
        {
            Admin = admin,
            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.UtcNow,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(GetManyUsersSettingsDTO usersSettings)
    {
        var usersQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsQueryable();

        /** Filters */
        if (usersSettings.Filters.FirstName != null) usersQuery = usersQuery.Where(user => user.Human!.FirstName.Contains(usersSettings.Filters.FirstName));
        if (usersSettings.Filters.MidName != null) usersQuery = usersQuery.Where(user => user.Human!.MidName.Contains(usersSettings.Filters.MidName));
        if (usersSettings.Filters.LastName != null) usersQuery = usersQuery.Where(user => user.Human!.LastName.Contains(usersSettings.Filters.LastName));

        if (usersSettings.Filters.Address != null)
        {
            if (usersSettings.Filters.Address.Country != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Country.Contains(usersSettings.Filters.Address.Country));
            if (usersSettings.Filters.Address.City != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.City.Contains(usersSettings.Filters.Address.City));
            if (usersSettings.Filters.Address.Street != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Street.Contains(usersSettings.Filters.Address.Street));
        }

        if (usersSettings.Filters.MinAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates >= usersSettings.Filters.MinAverageRates);
        if (usersSettings.Filters.MaxAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates <= usersSettings.Filters.MaxAverageRates);

        if (usersSettings.Filters.MinDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth >= usersSettings.Filters.MinDateOfBirth);
        if (usersSettings.Filters.MaxDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth <= usersSettings.Filters.MaxDateOfBirth);

        if (usersSettings.Filters.PhoneNumber != null) usersQuery = usersQuery.Where(user => user.Human!.PhoneNumber.Contains(usersSettings.Filters.PhoneNumber));

        if (usersSettings.Filters.Email != null) usersQuery = usersQuery.Where(user => user.Human!.Email.Contains(usersSettings.Filters.Email));

        usersQuery = usersQuery
        .Where(user => user.IsDeleted == usersSettings.Filters.IsDeleted);

        if (usersSettings.Filters.IsDeleted == true)
        {
            if (usersSettings.Filters.DeletedAt != null) usersQuery = usersQuery.Where(user => user.DeletedAt == usersSettings.Filters.DeletedAt);
            else
            {
                if (usersSettings.Filters.DeletedBefore != null) usersQuery = usersQuery.Where(user => user.DeletedAt <= usersSettings.Filters.DeletedBefore);
                if (usersSettings.Filters.DeletedAfter != null) usersQuery = usersQuery.Where(user => user.DeletedAt >= usersSettings.Filters.DeletedAfter);
            }
        }

        if (usersSettings.Filters.UpdatedAt != null) usersQuery = usersQuery.Where(user => user.UpdatedAt == usersSettings.Filters.UpdatedAt);
        else
        {
            if (usersSettings.Filters.UpdatedBefore != null) usersQuery = usersQuery.Where(user => user.UpdatedAt <= usersSettings.Filters.UpdatedBefore);
            if (usersSettings.Filters.UpdatedAfter != null) usersQuery = usersQuery.Where(user => user.UpdatedAt >= usersSettings.Filters.UpdatedAfter);
        }

        if (usersSettings.Filters.CreatedAt != null) usersQuery = usersQuery.Where(user => user.CreatedAt == usersSettings.Filters.CreatedAt);
        else
        {
            if (usersSettings.Filters.CreatedBefore != null) usersQuery = usersQuery.Where(user => user.CreatedAt <= usersSettings.Filters.CreatedBefore);
            if (usersSettings.Filters.CreatedAfter != null) usersQuery = usersQuery.Where(user => user.CreatedAt >= usersSettings.Filters.CreatedAfter);
        }

        var usersTotalFoundRecords = await usersQuery.CountAsync();

        if (usersSettings.Sorting.Ascending == true)
        {
            switch (usersSettings.Sorting.By)
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
            switch (usersSettings.Sorting.By)
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
        .Skip(usersSettings.Pagination.RequestedPage)
        .Take((int)usersSettings.Pagination.RecordsPerRequest);

        var users = await usersQuery
        .AsNoTracking()
        .Select(user => new UserEntityDTO(user)).ToArrayAsync();

        return new(
            users,
            new(usersTotalFoundRecords, usersSettings.Pagination.RecordsPerRequest, usersSettings.Pagination.RequestedPage)
        );
    }
};