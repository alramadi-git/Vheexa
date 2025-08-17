using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using DataAccess.Entities;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories;

public class General : IRepository
{
    private readonly ILogger _Logger;
    private readonly AppDBContext _AppDBContext;

    public General(ILogger logger, AppDBContext appDBContext)
    {
        _Logger = logger;
        _AppDBContext = appDBContext;
    }


    /** One */
    public async Task<Human> AddOneHumanAsync()
    {
        /** Check If User Exists */
        if (await GetOneHumanAsNoTrackingAsync("Email", "Password") == null)
            throw new Exception($"This email {"email"} already in use.");

        /** Address */
        var addressEntityEntry = await _AppDBContext.Addresses
        .AddAsync(
            new Address
            {
                URL = "URL",
                Country = "Country",
                City = "City",
                Street = "Street",
            }
        );

        var address = addressEntityEntry.Entity.ID;

        /** Image */
        uint? imageID = null;
        if (true)
        {
            var imageEntityEnter = await _AppDBContext.Images
            .AddAsync(
                new Image
                {
                    URL = "URL",
                    Alternate = "Alternate",
                }
            );

            imageID = imageEntityEnter.Entity.ID;
        }

        /** Human */
        var humanEntityEntry = await _AppDBContext.Humans
        .AddAsync(
            new Human
            {
                AddressID = address,
                ImageID = imageID,

                FirstName = "FirstName",
                MidName = "MidName",
                LastName = "LastName",

                DateOfBirth = new DateOnly(),

                PhoneNumber = "PhoneNumber",

                Email = "Email",
                Password = "Password",
            }
        );

        var human = humanEntityEntry.Entity;
        _Logger.LogInformation($"User With ID {{ {human.ID} }} Was Added");

        return human;
    }

    public async Task<Human> GetOneHumanAsNoTrackingAsync(uint id)
    {
        var human = await _AppDBContext.Humans
        .AsNoTracking()
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (human == null) throw new Exception("Not such record");
        return human;
    }
    public async Task<Human> GetOneHumanAsNoTrackingAsync(string email)
    {
        var human = await _AppDBContext.Humans
        .AsNoTracking()
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.Email == email);

        if (human == null) throw new Exception("Email or Password is Incorrect");
        return human;
    }
    public async Task<Human> GetOneHumanAsNoTrackingAsync(string email, string password)
    {
        var human = await _AppDBContext.Humans
        .AsNoTracking()
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.Email == email && user.Password == password);

        if (human == null) throw new Exception("Email or Password is Incorrect");
        return human;
    }

    public async Task<Human> GetOneHumanAsync(uint id)
    {
        var human = await _AppDBContext.Humans
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.ID == id);

        if (human == null) throw new Exception("Not such record");
        return human;
    }
    public async Task<Human> GetOneHumanAsync(string email)
    {
        var human = await _AppDBContext.Humans
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.Email == email);

        if (human == null) throw new Exception("Email or Password is Incorrect");
        return human;
    }
    public async Task<Human> GetOneHumanAsync(string email, string password)
    {
        var human = await _AppDBContext.Humans
        .Include(user => user.Address)
        .Include(user => user.Image)
        .FirstOrDefaultAsync((user) => user.Email == email && user.Password == password);

        if (human == null) throw new Exception("Email or Password is Incorrect");
        return human;
    }

    public async Task<bool> UpdateHumanOneAsync(uint id)
    {
        var human = await GetOneHumanAsync(id);
        // TODO: UpdateLogic

        return true;
    }
    /** Many */
};