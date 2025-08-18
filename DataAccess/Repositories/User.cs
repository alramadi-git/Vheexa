using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using DataAccess.Repositories.Interfaces;
using DataAccess.helpers;

namespace DataAccess.Repositories;

public class User : IRepository
{
    private readonly General _General;

    private readonly ILogger _Logger;
    private readonly AppDBContext _AppDBContext;

    public User(ILogger logger, AppDBContext appDBContext, General general)
    {
        _General = general;

        _Logger = logger;
        _AppDBContext = appDBContext;
    }


    /** One */
    public async Task<bool> AddOneAsync(Additions.User newUser)
    {
          /** TODO: Remove human and do it static here */
        var human = await _General.AddOneHumanAsync();

        /** User */
        var user = await _AppDBContext.Users
        .AddAsync(
            new Entities.User
            {
                HumanID = human.ID,
                AverageRates = 0,

                IsDeleted = false,
                DeletedAt = null,

                UpdatedAt = DateTime.Now,
                CreatedAt = DateTime.Now,
            }
        );

        _Logger.LogInformation($"User With ID {{ {user.Entity.ID} }} Was Added");

        await _AppDBContext.SaveChangesAsync();
        return true;
    }

    public async Task<Entities.User> GetOneAsync(uint id)
    {
        var user = await _AppDBContext.Users
        .AsNoTracking()
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new Exception("Not such user.");

        return user;
    }
    public async Task<Entities.User> GetOneAsync(string email, string password)
    {
        var human = await _AppDBContext.Humans
       .Include(user => user.Address)
       .Include(user => user.Image)
       .FirstOrDefaultAsync((user) => user.Email == email && user.Password == password);

        if (human == null) throw new Exception("Email or Password is Incorrect");

        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.HumanID == human.ID);

        if (user == null) throw new Exception("Not such user.");

        return user;
    }

    public async Task<bool> UpdateOneAsync(uint id)
    {
        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new Exception("Not such user.");

        await _General.UpdateHumanOneAsync(user.HumanID);
        user.UpdatedAt = DateTime.Now;

        await _AppDBContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteOneAsync(uint id)
    {
        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (user == null) throw new Exception("Not such user.");

        user.IsDeleted = true;
        user.DeletedAt = DateTime.Now;

        await _AppDBContext.SaveChangesAsync();
        return true;
    }

    /** Many */
    public async Task<IEnumerable<Entities.User>> GetManyAsNoTrackingAsync(
        Filters.User filter
    )
    {
        var users = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .AsNoTracking();

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
        users = users.Skip(filter.pagination.Skip).Take((int)filter.pagination.Take);


        /** TODO: Return
            - Pagination
                Return object with {
                TotalFoundRecords,
                RecordsPerPage,
                CurrentPage,
                }    
        */
        return users;
    }
};