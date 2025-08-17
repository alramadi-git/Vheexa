using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using DataAccess.Repositories.Interfaces;
using System.Data;

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
    public async Task<bool> AddOneAsync()
    {
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
        var human = await _General.GetOneHumanAsNoTrackingAsync(email, password);

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
    // public async Task<Entities.User> AddManyAsync() { }

    // public async Task<Entities.User> GetManyAsync() { }

    // public async Task<Entities.User> UpdateManyAsync() { }

    // public async Task<Entities.User> DeleteManyAsync() { }

};