using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.Responses;

using DataAccess.Repositories.Interfaces;
using DataAccess.Repositories.Modules;

namespace DataAccess.Repositories;

public class UserRepository : IRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddOneAsync(Modules.Adds.User newUser)
    {
        var human = await _AppDBContext.Humans.FirstOrDefaultAsync(human => human.Email == newUser.Email);
        if (human != null) throw new Error(Error.STATUS.CONFLICT, "Email is already in use.");

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
                Password = new PasswordHasher<object?>().HashPassword(null, newUser.Password),
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

    public async Task<Entities.UserEntity> GetOneAsync(int id)
    {
        var user = await _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        return user;
    }
    public async Task<Entities.UserEntity> GetOneAsync(string phoneNumber)
    {
        var human = await _AppDBContext.Humans
        .Include(user => user.Image)
        .Include(user => user.Address)
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.PhoneNumber == phoneNumber);

        if (human == null) throw new Error(Error.STATUS.NOT_FOUND, "No such phone number.");

        var user = await _AppDBContext.Users
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.HumanID == human.ID);

        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        return user;
    }
    public async Task<Entities.UserEntity> GetOneAsync(string email, string password)
    {
        var human = await _AppDBContext.Humans
        .Include(user => user.Image)
        .Include(user => user.Address)
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.Email == email);

        if (human == null) throw new Error(Error.STATUS.UNAUTHORIZED, $"No such user with {email} email.");

        var verifiedPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, human.Password, password);
        if (verifiedPassword == PasswordVerificationResult.Failed) throw new Error(Error.STATUS.UNAUTHORIZED, "Password is incorrect.");

        var user = await _AppDBContext.Users
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.HumanID == human.ID);

        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        return user;
    }

    public async Task UpdateOneAsync(int id, Modules.Updates.User updatedUser)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address);

        var user = await userQuery.FirstOrDefaultAsync((user) => user.ID == id);
        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        var image = user.Human!.Image;
        var address = user.Human.Address!;

        if (image != null)
        {
            if (updatedUser.Image == null)
            {
                _AppDBContext.Images.Remove(image);
                user.Human.Image = null;
            }
            else
            {
                image.URL = updatedUser.Image.URL;
                image.Alternate = updatedUser.Image.Alternate;
            }
        }

        address.URL = updatedUser.Address.URL;
        address.Country = updatedUser.Address.Country;
        address.City = updatedUser.Address.City;
        address.Street = updatedUser.Address.Street;

        user.Human.FirstName = updatedUser.FirstName;
        user.Human.MidName = updatedUser.MidName;
        user.Human.LastName = updatedUser.LastName;

        user.Human.DateOfBirth = updatedUser.DateOfBirth;

        user.Human.PhoneNumber = updatedUser.PhoneNumber;

        user.Human.Email = updatedUser.Email;

        user.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteOneAsync(int id)
    {
        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessMany<Entities.UserEntity>> GetManyAsync(
        Modules.Filters.User filter,
        Modules.Sorting.User sorting,
        Modules.Filters.Pagination pagination
    )
    {
        var users = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsNoTracking();

        /** Filters */
        if (filter.FirstName != null) users = users.Where(user => user.Human!.FirstName.Contains(filter.FirstName));
        if (filter.MidName != null) users = users.Where(user => user.Human!.MidName.Contains(filter.MidName));
        if (filter.LastName != null) users = users.Where(user => user.Human!.LastName.Contains(filter.LastName));

        if (filter.Address != null)
        {
            if (filter.Address.Country != null) users = users.Where(user => user.Human!.Address!.Country.Contains(filter.Address.Country));
            if (filter.Address.City != null) users = users.Where(user => user.Human!.Address!.City.Contains(filter.Address.City));
            if (filter.Address.Street != null) users = users.Where(user => user.Human!.Address!.Street.Contains(filter.Address.Street));
        }
        ;

        if (filter.MinAverageRates != null) users = users.Where(user => user.AverageRates >= filter.MinAverageRates);
        if (filter.MaxAverageRates != null) users = users.Where(user => user.AverageRates <= filter.MaxAverageRates);

        if (filter.MinDateOfBirth != null) users = users.Where(user => user.Human!.DateOfBirth >= filter.MinDateOfBirth);
        if (filter.MaxDateOfBirth != null) users = users.Where(user => user.Human!.DateOfBirth <= filter.MaxDateOfBirth);

        if (filter.PhoneNumber != null) users = users.Where(user => user.Human!.PhoneNumber.Contains(filter.PhoneNumber));

        if (filter.Email != null) users = users.Where(user => user.Human!.Email.Contains(filter.Email));

        users = users.Where(user => user.IsDeleted == filter.IsDeleted);
        if (filter.IsDeleted == true)
        {
            if (filter.DeletedAt != null) users = users.Where(user => user.DeletedAt == filter.DeletedAt);
            else
            {
                if (filter.DeletedBefore != null) users = users.Where(user => user.DeletedAt <= filter.DeletedBefore);
                if (filter.DeletedAfter != null) users = users.Where(user => user.DeletedAt >= filter.DeletedAfter);
            }
            ;
        }
        ;

        if (filter.UpdatedAt != null) users = users.Where(user => user.UpdatedAt == filter.UpdatedAt);
        else
        {
            if (filter.UpdatedBefore != null) users = users.Where(user => user.UpdatedAt <= filter.UpdatedBefore);
            if (filter.UpdatedAfter != null) users = users.Where(user => user.UpdatedAt >= filter.UpdatedAfter);
        }
        ;

        if (filter.CreatedAt != null) users = users.Where(user => user.CreatedAt == filter.CreatedAt);
        else
        {
            if (filter.CreatedBefore != null) users = users.Where(user => user.CreatedAt <= filter.CreatedBefore);
            if (filter.CreatedAfter != null) users = users.Where(user => user.CreatedAt >= filter.CreatedAfter);
        }
        ;

        var usersTotalFoundRecords = await users.CountAsync();

        if (sorting.Ascending == true)
        {
            switch (sorting.By)
            {
                case Modules.Sorting.USER_OPTION.FULL_NAME:
                    users = users
                    .OrderBy(user => user.Human!.FirstName)
                    .ThenBy(user => user.Human!.MidName)
                    .ThenBy(user => user.Human!.LastName);
                    break;

                case Modules.Sorting.USER_OPTION.AVERAGE_RATES:
                    users = users.OrderBy(user => user.AverageRates);
                    break;

                case Modules.Sorting.USER_OPTION.DATE_OF_BIRTH:
                    users = users.OrderBy(user => user.Human!.DateOfBirth);
                    break;

                case Modules.Sorting.USER_OPTION.MODIFICATION:
                    users = users.OrderBy(user => user.UpdatedAt);
                    break;

                case Modules.Sorting.USER_OPTION.DELETION:
                    users = users.OrderBy(user => user.UpdatedAt);
                    break;

                case Modules.Sorting.USER_OPTION.CREATION:
                    users = users.OrderBy(user => user.CreatedAt);
                    break;
            }

        }
        else
        {
            switch (sorting.By)
            {
                case Modules.Sorting.USER_OPTION.FULL_NAME:
                    users = users
                    .OrderByDescending(user => user.Human!.FirstName)
                    .ThenByDescending(user => user.Human!.MidName)
                    .ThenByDescending(user => user.Human!.LastName);
                    break;

                case Modules.Sorting.USER_OPTION.AVERAGE_RATES:
                    users = users.OrderByDescending(user => user.AverageRates);
                    break;

                case Modules.Sorting.USER_OPTION.DATE_OF_BIRTH:
                    users = users.OrderByDescending(user => user.Human!.DateOfBirth);
                    break;

                case Modules.Sorting.USER_OPTION.DELETION:
                    users = users.OrderByDescending(user => user.UpdatedAt);
                    break;

                case Modules.Sorting.USER_OPTION.MODIFICATION:
                    users = users.OrderByDescending(user => user.UpdatedAt);
                    break;

                case Modules.Sorting.USER_OPTION.CREATION:
                    users = users.OrderByDescending(user => user.CreatedAt);
                    break;
            }
        }
        ;

        users = users.Skip(pagination.Skip).Take(pagination.Take);

        return new(
            await users.ToListAsync(),
            new(usersTotalFoundRecords, pagination.Take, pagination.Skip)
        );
    }
};