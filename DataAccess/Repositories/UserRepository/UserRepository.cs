using Microsoft.EntityFrameworkCore;
using DataAccess.RequestDTOs;

namespace DataAccess.Repositories.UserRepository;

public class UserRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateOneAsync(int id, UserUpdateRequestDTO userUpdatedData)
    {
        var user = await _AppDBContext.Users
        .Include(user => user.Human)
        .ThenInclude(human => human!.Image)
        .Include(user => user.Human)
        .ThenInclude(human => human!.Address)
        .FirstOrDefaultAsync((user) => user.ID == id);

        var image = user!.Human!.Image;
        var address = user.Human.Address!;

        if (userUpdatedData.Image == null)
        {
            if (image != null)
            {
                _AppDBContext.Images.Remove(image);
                image = null;
            }
            ;
        }
        else
        {
            if (image == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = userUpdatedData.Image.URL,
                        Alternate = userUpdatedData.Image.Alternate,
                    });

                image = imageEntityEntry.Entity;
            }
            else
            {
                image.URL = userUpdatedData.Image.URL;
                image.Alternate = userUpdatedData.Image.Alternate;
            }
            ;
        }

        address.URL = userUpdatedData.Address.URL;
        address.Country = userUpdatedData.Address.Country;
        address.City = userUpdatedData.Address.City;
        address.Street = userUpdatedData.Address.Street;

        user.Human.FirstName = userUpdatedData.FirstName;
        user.Human.MidName = userUpdatedData.MidName;
        user.Human.LastName = userUpdatedData.LastName;

        user.Human.DateOfBirth = userUpdatedData.DateOfBirth;

        user.Human.PhoneNumber = userUpdatedData.PhoneNumber;

        user.Human.Email = userUpdatedData.Email;

        user.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteOneAsync(int id)
    {
        var user = await _AppDBContext.Users
        .FirstOrDefaultAsync((user) => user.ID == id);

        user!.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};