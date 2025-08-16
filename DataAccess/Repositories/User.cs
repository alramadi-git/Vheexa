using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories;

public class User : IRepository
{
    private readonly ILogger _Logger;
    private readonly AppDBContext _AppDBContext;

    public User(ILogger logger, AppDBContext appDBContext)
    {
        _Logger = logger;
        _AppDBContext = appDBContext;
    }

    public async Task AddOneAsync()
    {
        /** Check If User Exists */
        if (await _AppDBContext.Humans.AsNoTracking().FirstOrDefaultAsync((user) => user.Email == "Email" || user.PhoneNumber == "PhoneNumber") == null)
            throw new Exception();

        /** Address */
        uint addressID;
        if (true)
        {
            var address = await _AppDBContext.Addresses
            .AddAsync(
                new Entities.Address
                {
                    URL = "URL",
                    Country = "Country",
                    City = "City",
                    Street = "Street",
                }
            );

            addressID = address.Entity.ID;
        }


        /** Image */
        uint? imageID = null;
        if (true)
        {
            var image = await _AppDBContext.Images
            .AddAsync(
                new Entities.Image
                {
                    URL = "URL",
                    Alternate = "Alternate",
                }
            );

            imageID = image.Entity.ID;
        }

        /** Human */
        var human = await _AppDBContext.Humans
        .AddAsync(
            new Entities.Human
            {
                AddressID = addressID,
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

        uint humanID = human.Entity.ID;

        /** User */
        var user = await _AppDBContext.Users
        .AddAsync(
            new Entities.User
            {
                HumanID = humanID,
                AverageRates = 0,

                IsDeleted = false,
                DeletedAt = null,

                UpdatedAt = DateTime.Now,
                CreatedAt = DateTime.Now,
            }
        );

        _Logger.LogInformation($"User With ID {{ {user.Entity.ID} }} Was Added");

        await _AppDBContext.SaveChangesAsync();
    }
};