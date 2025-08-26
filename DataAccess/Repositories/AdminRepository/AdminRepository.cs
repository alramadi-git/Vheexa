using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task ResetPasswordAsync(int id, string newPassword)
    {
        var adminQuery = _AppDBContext.Admins
        .Include(admin => admin.Human)
        .Where((admin) => admin.ID == id);

        var admin = await adminQuery.FirstOrDefaultAsync();
        var passwordHasher = new PasswordHasher<object?>();

        admin!.Human!.Password = passwordHasher.HashPassword(null, newPassword);

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, AdminUpdateRequestDTO adminUpdatedData)
    {
        var adminQuery = _AppDBContext.Admins
        .Include(admin => admin.Human)
        .ThenInclude(human => human!.Image)
        .Include(admin => admin.Human)
        .ThenInclude(human => human!.Address)
        .Where((admin) => admin.ID == id);

        var admin = await adminQuery.FirstOrDefaultAsync();

        admin!.UpdatedAt = DateTime.UtcNow;

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

        admin.Human.Address!.URL = adminUpdatedData.Address.URL;
        admin.Human.Address.Country = adminUpdatedData.Address.Country;
        admin.Human.Address.City = adminUpdatedData.Address.City;
        admin.Human.Address.Street = adminUpdatedData.Address.Street;

        admin.Human.FirstName = adminUpdatedData.FirstName;
        admin.Human.MidName = adminUpdatedData.MidName;
        admin.Human.LastName = adminUpdatedData.LastName;

        admin.Human.DateOfBirth = adminUpdatedData.DateOfBirth;

        admin.Human.PhoneNumber = adminUpdatedData.PhoneNumber;

        admin.Human.Email = adminUpdatedData.Email;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.ID == id);

        var admin = await adminQuery.FirstOrDefaultAsync();

        admin!.IsDeleted = true;
        admin.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};