using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task ResetPasswordAsync(int partnerID, string newPassword)
    {
        var partnerQuery = _AppDBContext.Partners
        .Where((partner) => partner.ID == partnerID);

        var partner = await partnerQuery.FirstOrDefaultAsync();
        if (partner == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner.");

        var passwordHasher = new PasswordHasher<object?>();
        partner.Password = passwordHasher.HashPassword(null, newPassword);

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task UpdateOneAsync(int partnerID, PartnerUpdateRequestDTO partnerUpdatedData)
    {
        var partnerQuery = _AppDBContext.Partners
        .Where((partner) => partner.ID == partnerID);

        var partner = await partnerQuery.FirstOrDefaultAsync((partner) => partner.ID == partnerID);
        if (partner == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner.");

        partner.UpdatedAt = DateTime.UtcNow;

        if (partnerUpdatedData.Image == null)
        {
            if (partner.Image != null)
            {
                _AppDBContext.Images.Remove(partner.Image);
                partner.Image = null;
            }
        }
        else
        {
            if (partner.Image == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = partnerUpdatedData.Image.URL,
                        Alternate = partnerUpdatedData.Image.Alternate,
                    });

                partner.Image = imageEntityEntry.Entity;
            }
            else
            {
                partner.Image.URL = partnerUpdatedData.Image.URL;
                partner.Image.Alternate = partnerUpdatedData.Image.Alternate;
            }
        }

        partner.Human.Address!.URL = partnerUpdatedData.Address.URL;
        partner.Human.Address.Country = partnerUpdatedData.Address.Country;
        partner.Human.Address.City = partnerUpdatedData.Address.City;
        partner.Human.Address.Street = partnerUpdatedData.Address.Street;

        partner.Human.FirstName = partnerUpdatedData.FirstName;
        partner.Human.MidName = partnerUpdatedData.MidName;
        partner.Human.LastName = partnerUpdatedData.LastName;

        partner.Human.DateOfBirth = partnerUpdatedData.DateOfBirth;

        partner.Human.PhoneNumber = partnerUpdatedData.PhoneNumber;

        partner.Human.Email = partnerUpdatedData.Email;

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task DeleteOneAsync(int partnerID)
    {
        var partnerQuery = _AppDBContext.Partners
        .Where((partner) => partner.ID == partnerID);

        var partner = await partnerQuery
        .FirstOrDefaultAsync();

        if (partner == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner.");

        partner.IsDeleted = true;
        partner.DeletedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }

};