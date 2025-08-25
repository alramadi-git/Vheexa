using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminUserRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminUserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddOneAsync(UserAddRequestDTO newUser)
    {
        var isEmailOrPhoneNumberInUse = await _AppDBContext.Humans.AnyAsync(human => human.Email == newUser.Email || human.PhoneNumber == newUser.PhoneNumber);
        if (isEmailOrPhoneNumberInUse == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "Email or phone number is already in use.");

        Entities.ImageEntity? image = null;
        if (newUser.Image != null)
        {
            var imageEntityEntry = _AppDBContext.Images.Add(
                new Entities.ImageEntity
                {
                    URL = newUser.Image.URL,
                    Alternate = newUser.Image.Alternate,
                });

            image = imageEntityEntry.Entity;
        }
        ;

        var AddressEntityEntry = _AppDBContext.Addresses.Add(
            new Entities.AddressEntity
            {
                URL = newUser.Address.URL,

                Country = newUser.Address.Country,
                City = newUser.Address.City,
                Street = newUser.Address.Street,
            });
        var HumanEntityEntry = _AppDBContext.Humans.Add(
            new Entities.HumanEntity
            {
                Image = image,
                Address = AddressEntityEntry.Entity,

                FirstName = newUser.FirstName,
                MidName = newUser.MidName,
                LastName = newUser.LastName,

                DateOfBirth = newUser.DateOfBirth,

                PhoneNumber = newUser.PhoneNumber,

                Email = newUser.Email,
                Password = newUser.Password,
            });

        var UserEntityEntry = _AppDBContext.Users
        .Add(
            new Entities.UserEntity
            {
                Human = HumanEntityEntry.Entity,
                AverageRates = 0,

                IsDeleted = false,
                DeletedAt = null,

                UpdatedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
            }
        );

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> GetOneAsync(int id)
    {
        var user = await _AppDBContext.Users
        .AsNoTracking()
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        return new(new(user));
    }

    public async Task UpdateOneAsync(int id, UserUpdateRequestDTO userUpdatedData)
    {
        var user = await _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .FirstOrDefaultAsync((user) => user.ID == id);

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

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteOneAsync(int id)
    {
        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");
        if (user.IsDeleted == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "User is already deleted.");

        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(
        UserFiltersRequestDTO filter,
        UserSortingRequestDTO sorting,
        PaginationRequestDTO pagination
    )
    {
        var usersQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsNoTracking();

        /** Filters */
        if (filter != null)
        {
            if (filter.FirstName != null) usersQuery = usersQuery.Where(user => user.Human!.FirstName.Contains(filter.FirstName));
            if (filter.MidName != null) usersQuery = usersQuery.Where(user => user.Human!.MidName.Contains(filter.MidName));
            if (filter.LastName != null) usersQuery = usersQuery.Where(user => user.Human!.LastName.Contains(filter.LastName));

            if (filter.Address != null)
            {
                if (filter.Address.Country != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Country.Contains(filter.Address.Country));
                if (filter.Address.City != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.City.Contains(filter.Address.City));
                if (filter.Address.Street != null) usersQuery = usersQuery.Where(user => user.Human!.Address!.Street.Contains(filter.Address.Street));
            }
        ;

            if (filter.MinAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates >= filter.MinAverageRates);
            if (filter.MaxAverageRates != null) usersQuery = usersQuery.Where(user => user.AverageRates <= filter.MaxAverageRates);

            if (filter.MinDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth >= filter.MinDateOfBirth);
            if (filter.MaxDateOfBirth != null) usersQuery = usersQuery.Where(user => user.Human!.DateOfBirth <= filter.MaxDateOfBirth);

            if (filter.PhoneNumber != null) usersQuery = usersQuery.Where(user => user.Human!.PhoneNumber.Contains(filter.PhoneNumber));

            if (filter.Email != null) usersQuery = usersQuery.Where(user => user.Human!.Email.Contains(filter.Email));

            usersQuery = usersQuery.Where(user => user.IsDeleted == filter.IsDeleted);
            if (filter.IsDeleted == true)
            {
                if (filter.DeletedAt != null) usersQuery = usersQuery.Where(user => user.DeletedAt == filter.DeletedAt);
                else
                {
                    if (filter.DeletedBefore != null) usersQuery = usersQuery.Where(user => user.DeletedAt <= filter.DeletedBefore);
                    if (filter.DeletedAfter != null) usersQuery = usersQuery.Where(user => user.DeletedAt >= filter.DeletedAfter);
                }
                ;
            }
        ;

            if (filter.UpdatedAt != null) usersQuery = usersQuery.Where(user => user.UpdatedAt == filter.UpdatedAt);
            else
            {
                if (filter.UpdatedBefore != null) usersQuery = usersQuery.Where(user => user.UpdatedAt <= filter.UpdatedBefore);
                if (filter.UpdatedAfter != null) usersQuery = usersQuery.Where(user => user.UpdatedAt >= filter.UpdatedAfter);
            }
        ;

            if (filter.CreatedAt != null) usersQuery = usersQuery.Where(user => user.CreatedAt == filter.CreatedAt);
            else
            {
                if (filter.CreatedBefore != null) usersQuery = usersQuery.Where(user => user.CreatedAt <= filter.CreatedBefore);
                if (filter.CreatedAfter != null) usersQuery = usersQuery.Where(user => user.CreatedAt >= filter.CreatedAfter);
            }
        ;
        }
        ;

        var usersTotalFoundRecords = await usersQuery.CountAsync();


        if (sorting.Ascending == true)
        {
            switch (sorting.By)
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
            ;
        }
        else
        {
            switch (sorting.By)
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
            ;
        }
        ;

        usersQuery = usersQuery
        .Skip(pagination.RequestedPage)
        .Take((int)pagination.RecordsPerRequest);

        var users = await usersQuery
        .Select(user => new UserEntityDTO(user))
        .ToArrayAsync();

        return new SuccessManyResponseDTO<UserEntityDTO>(
            users,
            new PaginationResponseDTO(usersTotalFoundRecords, pagination.RecordsPerRequest, pagination.RequestedPage)
        );
    }
};