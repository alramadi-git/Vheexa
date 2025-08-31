using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateAsync(int partnerID, PartnerUpdateRequestDTO partnerUpdatedData)
    {
        var partnerQuery = _AppDBContext.Partners
        .Include(partner => partner.Image)
        .Where((partner) =>
            partner.ID == partnerID &&
            partner.IsPublished == true &&
            partner.IsDeleted == false
        );

        var partner = await partnerQuery.FirstOrDefaultAsync((user) => user.ID == partnerID) ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner.");

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
                    });

                partner.Image = imageEntityEntry.Entity;
            }
            else
            {
                partner.Image.URL = partnerUpdatedData.Image.URL;
            }
        }

        partner.Handle = partnerUpdatedData.Handle;

        partner.Name = partnerUpdatedData.Name;

        partner.PhoneNumber = partnerUpdatedData.PhoneNumber;

        partner.Email = partnerUpdatedData.Email;

        partner.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};