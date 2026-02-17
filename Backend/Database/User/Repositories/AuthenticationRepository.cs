using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using Database.Entities;

using Database.Inputs;
using Database.User.Inputs;

using Database.User.Models;

namespace Database.User.Repositories;

public class ClsAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsUserAccountModel> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newAvatar = credentials.Avatar == null ? null : new ClsImageEntity
            {
                Id = credentials.Avatar.Id,
                Url = credentials.Avatar.Url,
            };
            var newLocation = new ClsLocationEntity
            {
                Uuid = Guid.NewGuid(),
                Country = credentials.Location.Country,
                City = credentials.Location.City,
                Street = credentials.Location.Street,
                Latitude = credentials.Location.Latitude,
                Longitude = credentials.Location.Longitude,
            };

            var hashPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
            var newUser = new ClsUserEntity
            {
                Uuid = credentials.Uuid,
                AvatarId = newAvatar?.Id,
                LocationUuid = newLocation.Uuid,
                Username = credentials.Username,
                Birthday = credentials.Birthday,
                PhoneNumber = credentials.PhoneNumber,
                Email = credentials.Email,
                Password = hashPassword,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            if (newAvatar != null) _AppDBContext.Images.Add(newAvatar);
            _AppDBContext.Locations.Add(newLocation);
            _AppDBContext.Users.Add(newUser);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var userAccountDto = new ClsUserAccountModel
            {
                Uuid = newUser.Uuid,
                Avatar = newUser.Avatar == null ? null : new Database.Models.ClsImageModel
                {
                    Id = newUser.Avatar.Id,
                    Url = newUser.Avatar.Url,
                },
                Location = new Database.Models.ClsLocationModel
                {
                    Country = newUser.Location.Country,
                    City = newUser.Location.City,
                    Street = newUser.Location.Street,
                    Latitude = newUser.Location.Latitude,
                    Longitude = newUser.Location.Longitude,
                },
                Username = newUser.Username,
                Birthday = newUser.Birthday,
                PhoneNumber = newUser.PhoneNumber,
                Email = newUser.Email,
            };

            return userAccountDto;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<ClsUserAccountModel> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        var user = await _AppDBContext.Users
        .AsNoTracking()
        .Include(user => user.Avatar)
        .Include(user => user.Location)
        .Where(user =>
            user.Email == credentials.Email &&
            !user.IsDeleted
        )
        .FirstAsync();

        var hashPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, user.Password, credentials.Password);
        if (hashPassword != PasswordVerificationResult.Success) throw new ArgumentException("Invalid password");
        if (hashPassword != PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackedUser = await _AppDBContext.Users
            .Where(user => user.Email == credentials.Email)
            .FirstAsync();

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
            trackedUser.Password = hashedPassword;

            await _AppDBContext.SaveChangesAsync();
        }

        var userAccountDto = new ClsUserAccountModel
        {
            Uuid = user.Uuid,
            Avatar = user.Avatar == null ? null : new Database.Models.ClsImageModel
            {
                Id = user.Avatar.Id,
                Url = user.Avatar.Url,
            },
            Location = new Database.Models.ClsLocationModel
            {
                Country = user.Location.Country,
                City = user.Location.City,
                Street = user.Location.Street,
                Latitude = user.Location.Latitude,
                Longitude = user.Location.Longitude,
            },
            Username = user.Username,
            Birthday = user.Birthday,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
        };

        return userAccountDto;
    }
}