using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateAsync(int adminID, AdminUpdateRequestDTO adminUpdatedData)
    {
        var adminQuery = _AppDBContext.Admins
        .Include(admin => admin.Human).ThenInclude(human => human!.Image)
        .Include(admin => admin.Human).ThenInclude(human => human!.Location)
        .Where((admin) => admin.ID == adminID && admin.IsDeleted == false);

        var admin = await adminQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such admin.");

        if (adminUpdatedData.Image == null)
        {
            if (admin.Human!.Image != null)
            {
                _AppDBContext.Images.Remove(admin.Human!.Image);
                admin.Human!.Image = null;
            }
        }
        else
        {
            if (admin.Human!.Image == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = adminUpdatedData.Image.URL,
                        Alternate = adminUpdatedData.Image.Alternate,
                    });

                admin.Human!.Image = imageEntityEntry.Entity;
            }
            else
            {
                admin.Human!.Image.URL = adminUpdatedData.Image.URL;
                admin.Human!.Image.Alternate = adminUpdatedData.Image.Alternate;
            }
        }

        admin.Human.Location!.URL = adminUpdatedData.Location.URL;
        admin.Human.Location.Country = adminUpdatedData.Location.Country;
        admin.Human.Location.City = adminUpdatedData.Location.City;
        admin.Human.Location.Street = adminUpdatedData.Location.Street;

        admin.Human.FirstName = adminUpdatedData.FirstName;
        admin.Human.MidName = adminUpdatedData.MidName;
        admin.Human.LastName = adminUpdatedData.LastName;

        admin.Human.DateOfBirth = adminUpdatedData.DateOfBirth;

        admin.Human.PhoneNumber = adminUpdatedData.PhoneNumber;

        admin.Human.Email = adminUpdatedData.Email;

        admin.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};