using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

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
        .Include(user => user.Human).ThenInclude(human => human!.Address)
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

        user.Human.Address!.Country = userUpdatedData.Address.Country;
        user.Human.Address.City = userUpdatedData.Address.City;
        user.Human.Address.Street = userUpdatedData.Address.Street;
        
        user.Human.Address.Latitude = userUpdatedData.Address.Latitude;
        user.Human.Address.Longitude = userUpdatedData.Address.Longitude;

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