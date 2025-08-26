using Microsoft.EntityFrameworkCore;
using DataAccess.RequestDTOs;
using Microsoft.AspNetCore.Identity;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.UserRepository;

public class UserRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }
    public async Task ResetPasswordAsync(int id, string newPassword)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .Where((user) => user.ID == id);

        var user = await userQuery.FirstOrDefaultAsync();
        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        var passwordHasher = new PasswordHasher<object?>();
        user.Human!.Password = passwordHasher.HashPassword(null, newPassword);

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task UpdateOneAsync(int id, UserUpdateRequestDTO userUpdatedData)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .Where((user) => user.ID == id);

        var user = await userQuery.FirstOrDefaultAsync((user) => user.ID == id);
        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        user.UpdatedAt = DateTime.UtcNow;

        if (userUpdatedData.Image == null)
        {
            if (user.Human!.Image != null)
            {
                _AppDBContext.Images.Remove(user.Human!.Image);
                user.Human!.Image = null;
            }
        }
        else
        {
            if (user.Human!.Image == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = userUpdatedData.Image.URL,
                        Alternate = userUpdatedData.Image.Alternate,
                    });

                user.Human!.Image = imageEntityEntry.Entity;
            }
            else
            {
                user.Human!.Image.URL = userUpdatedData.Image.URL;
                user.Human!.Image.Alternate = userUpdatedData.Image.Alternate;
            }
        }

        user.Human.Address!.URL = userUpdatedData.Address.URL;
        user.Human.Address.Country = userUpdatedData.Address.Country;
        user.Human.Address.City = userUpdatedData.Address.City;
        user.Human.Address.Street = userUpdatedData.Address.Street;

        user.Human.FirstName = userUpdatedData.FirstName;
        user.Human.MidName = userUpdatedData.MidName;
        user.Human.LastName = userUpdatedData.LastName;

        user.Human.DateOfBirth = userUpdatedData.DateOfBirth;

        user.Human.PhoneNumber = userUpdatedData.PhoneNumber;

        user.Human.Email = userUpdatedData.Email;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteOneAsync(int id)
    {
        var userQuery = _AppDBContext.Users
        .Where((user) => user.ID == id);

        var user = await userQuery
        .FirstOrDefaultAsync();

        if (user == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};