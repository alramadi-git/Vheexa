using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

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
        .Include(member => member.Human).ThenInclude(human => human!.Location)
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
                    });

                member.Human!.Image = imageEntityEntry.Entity;
            }
            else
            {
                member.Human!.Image.URL = memberUpdatedData.Image.URL;
            }
        }

        member.Human.Location!.Country = memberUpdatedData.Location.Country;
        member.Human.Location.City = memberUpdatedData.Location.City;
        member.Human.Location.Street = memberUpdatedData.Location.Street;

        member.Human.Location.Latitude = memberUpdatedData.Location.Latitude;
        member.Human.Location.Longitude = memberUpdatedData.Location.Longitude;

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