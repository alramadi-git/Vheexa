using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;

using DataAccess.Repositories.Interfaces;
using DataAccess.Responses;

namespace DataAccess.Repositories;

public class UserRepository : IRepository
{
    public class Filter : helpers.Filter.Human
    {
        public bool IsDeleted = false;
        public DateTime? DeletedBefore;
        public DateTime? DeletedAt;
        public DateTime? DeletedAfter;

        public DateTime? UpdatedBefore;
        public DateTime? UpdatedAt;
        public DateTime? UpdatedAfter;

        public DateTime? CreatedBefore;
        public DateTime? CreatedAt;
        public DateTime? CreatedAfter;
    }
    public class Ordering
    {
        public enum OPTIONS
        {
            NON,
            FULL_NAME,
            AVERAGE_RATES,
            DATE_OF_BIRTH,
            MODIFICATION,
            CREATION,
        }

        public OPTIONS By = OPTIONS.NON;
        public bool Ascending = true;
    }

    public class Add : helpers.Add.Human;
    public class Update : helpers.Update.Human;


    private readonly ILogger _Logger;
    private readonly AppDBContext _AppDBContext;

    public UserRepository(ILogger logger, AppDBContext appDBContext)
    {
        _Logger = logger;
        _AppDBContext = appDBContext;
    }

    /** One */
    public async Task AddOneAsync(Add newUser)
    {
        /** Human */
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

        /** User */
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

    public async Task UpdateOneAsync(int id, Update updatedData)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address);

        var user = await userQuery.FirstOrDefaultAsync((user) => user.ID == id);
        if (user == null) throw new Error(Error.STATUS.NOT_FOUND, "No such user.");

        if (user.Human!.Image != null)
        {
            user.Human.Image.URL = updatedData.Image.URL;
            user.Human.Image.Alternate = updatedData.Image.Alternate;
        }

        user.Human!.Address!.URL = updatedData.Address.URL;
        user.Human.Address.Country = updatedData.Address.Country;
        user.Human.Address.City = updatedData.Address.City;
        user.Human.Address.Street = updatedData.Address.Street;

        user.Human.FirstName = updatedData.FirstName;
        user.Human.MidName = updatedData.MidName;
        user.Human.LastName = updatedData.LastName;

        user.Human.DateOfBirth = updatedData.DateOfBirth;

        user.Human.PhoneNumber = updatedData.PhoneNumber;

        user.Human.Email = updatedData.Email;

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

    /** Many */
    public async Task<SuccessMany<Entities.UserEntity>> GetManyAsync(
        Filter filter,
        Ordering ordering
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

        if (ordering.Ascending == true)
        {
            switch (ordering.By)
            {
                case Ordering.OPTIONS.FULL_NAME:
                    users = users
                    .OrderBy(user => user.Human!.FirstName)
                    .ThenBy(user => user.Human!.MidName)
                    .ThenBy(user => user.Human!.LastName);
                    break;

                case Ordering.OPTIONS.AVERAGE_RATES:
                    users = users.OrderBy(user => user.AverageRates);
                    break;

                case Ordering.OPTIONS.DATE_OF_BIRTH:
                    users = users.OrderBy(user => user.Human!.DateOfBirth);
                    break;

                case Ordering.OPTIONS.MODIFICATION:
                    users = users.OrderBy(user => user.UpdatedAt);
                    break;

                case Ordering.OPTIONS.CREATION:
                    users = users.OrderBy(user => user.CreatedAt);
                    break;
            }

        }
        else
        {
            switch (ordering.By)
            {
                case Ordering.OPTIONS.FULL_NAME:
                    users = users
                    .OrderByDescending(user => user.Human!.FirstName)
                    .ThenByDescending(user => user.Human!.MidName)
                    .ThenByDescending(user => user.Human!.LastName);
                    break;

                case Ordering.OPTIONS.AVERAGE_RATES:
                    users = users.OrderByDescending(user => user.AverageRates);
                    break;

                case Ordering.OPTIONS.DATE_OF_BIRTH:
                    users = users.OrderByDescending(user => user.Human!.DateOfBirth);
                    break;

                case Ordering.OPTIONS.MODIFICATION:
                    users = users.OrderByDescending(user => user.UpdatedAt);
                    break;

                case Ordering.OPTIONS.CREATION:
                    users = users.OrderByDescending(user => user.CreatedAt);
                    break;
            }
        }
        ;

        users = users.Skip(filter.pagination.Skip).Take(filter.pagination.Take);

        return new(
            await users.ToListAsync(),
            new(usersTotalFoundRecords, filter.pagination.Take, filter.pagination.Skip)
        );
    }
};