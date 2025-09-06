using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.UserRepository;

public class UserRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateAsync(int userID, UserUpdateRequestDTO userUpdatedData)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human).ThenInclude(human => human!.Image)
        .Include(user => user.Human).ThenInclude(human => human!.Location)
        .Where((user) => user.ID == userID);

        var user = await userQuery.FirstOrDefaultAsync((user) => user.ID == userID) ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such user.");

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
                    });

                user.Human!.Image = imageEntityEntry.Entity;
            }
            else
            {
                user.Human!.Image.URL = userUpdatedData.Image.URL;
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