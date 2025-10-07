using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.User.Repositories;

public class AccountRepository
{
    private readonly AppDBContext _AppDBContext;

    public AccountRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateAsync(int userID, UserUpdateRequestDTO userUpdatedData)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human).ThenInclude(human => human!.Avatar)
        .Include(user => user.Human).ThenInclude(human => human!.Location)
        .Where((user) => user.ID == userID);

        var user = await userQuery.FirstOrDefaultAsync((user) => user.ID == userID) ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

        if (userUpdatedData.Image == null)
        {
            if (user.Human!.Avatar != null)
            {
                _AppDBContext.Images.Remove(user.Human!.Avatar);
                user.Human!.Avatar = null;
            }
        }
        else
        {
            if (user.Human!.Avatar == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = userUpdatedData.Image.URL,
                    });

                user.Human!.Avatar = imageEntityEntry.Entity;
            }
            else
            {
                user.Human!.Avatar.URL = userUpdatedData.Image.URL;
            }
        }

        user.Human.Location!.Country = userUpdatedData.Location.Country;
        user.Human.Location.City = userUpdatedData.Location.City;
        user.Human.Location.Street = userUpdatedData.Location.Street;

        user.Human.Location.Latitude = userUpdatedData.Location.Latitude;
        user.Human.Location.Longitude = userUpdatedData.Location.Longitude;

        user.Human.FirstName = userUpdatedData.FirstName;
        user.Human.MidName = userUpdatedData.MidName;
        user.Human.LastName = userUpdatedData.LastName;

        user.Human.DateOfBirth = userUpdatedData.DateOfBirth;

        user.Human.PhoneNumber = userUpdatedData.PhoneNumber;

        user.Human.Email = userUpdatedData.Email;

        user.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};