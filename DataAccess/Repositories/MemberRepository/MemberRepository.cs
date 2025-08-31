using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.MemberRepository;

public class MemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task UpdateAsync(int memberID, MemberUpdateRequestDTO memberUpdatedData)
    {
        var memberQuery = _AppDBContext.Members
        .Include(member => member.Human).ThenInclude(human => human!.Image)
        .Include(member => member.Human).ThenInclude(human => human!.Address)
        .Where((member) => member.ID == memberID);

        var member = await memberQuery.FirstOrDefaultAsync((member) => member.ID == memberID) ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such member.");

        if (memberUpdatedData.Image == null)
        {
            if (member.Human!.Image != null)
            {
                _AppDBContext.Images.Remove(member.Human!.Image);
                member.Human!.Image = null;
            }
        }
        else
        {
            if (member.Human!.Image == null)
            {
                var imageEntityEntry = _AppDBContext.Images.Add(
                    new Entities.ImageEntity
                    {
                        URL = memberUpdatedData.Image.URL,
                        Alternate = memberUpdatedData.Image.Alternate,
                    });

                member.Human!.Image = imageEntityEntry.Entity;
            }
            else
            {
                member.Human!.Image.URL = memberUpdatedData.Image.URL;
                member.Human!.Image.Alternate = memberUpdatedData.Image.Alternate;
            }
        }

        member.Human.Address!.URL = memberUpdatedData.Address.URL;
        member.Human.Address.Country = memberUpdatedData.Address.Country;
        member.Human.Address.City = memberUpdatedData.Address.City;
        member.Human.Address.Street = memberUpdatedData.Address.Street;

        member.Human.FirstName = memberUpdatedData.FirstName;
        member.Human.MidName = memberUpdatedData.MidName;
        member.Human.LastName = memberUpdatedData.LastName;

        member.Human.DateOfBirth = memberUpdatedData.DateOfBirth;

        member.Human.PhoneNumber = memberUpdatedData.PhoneNumber;

        member.Human.Email = memberUpdatedData.Email;

        member.UpdatedAt = DateTime.UtcNow;

        await _AppDBContext.SaveChangesAsync();
    }
};