using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerMemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync(int partnerID, MemberCreateRequestDTO memberAddData)
    {
        var isEmailOrPhoneNumberInUseQuery = _AppDBContext.Humans
        .Where(human => human.Email == memberAddData.Email || human.PhoneNumber == memberAddData.PhoneNumber);

        var isEmailOrPhoneNumberInUse = await isEmailOrPhoneNumberInUseQuery.AnyAsync();
        if (isEmailOrPhoneNumberInUse == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "Email or phone number is already in use | If you deleted your account with those credentials, please contact us to restore your account.");

        var imageEntityEntry = memberAddData.Image == null
        ? null
        : _AppDBContext.Images
        .Add(new Entities.ImageEntity
        {
            URL = memberAddData.Image.URL
        });

        var locationEntityEntry = _AppDBContext.Addresses.Add(
        new Entities.LocationEntity
        {
            Country = memberAddData.Location.Country,
            City = memberAddData.Location.City,
            Street = memberAddData.Location.Street,
            Latitude = memberAddData.Location.Latitude,
            Longitude = memberAddData.Location.Longitude,
        });

        var passwordHasher = new PasswordHasher<object?>();
        var HumanEntityEntry = _AppDBContext.Humans.Add(
        new Entities.HumanEntity
        {
            Image = imageEntityEntry?.Entity,
            Location = locationEntityEntry.Entity,

            FirstName = memberAddData.FirstName,
            MidName = memberAddData.MidName,
            LastName = memberAddData.LastName,

            DateOfBirth = memberAddData.DateOfBirth,

            PhoneNumber = memberAddData.PhoneNumber,

            Email = memberAddData.Email,
            Password = passwordHasher.HashPassword(null, memberAddData.Password),
        });

        var memberEntityEntry = _AppDBContext.Members
        .Add(
            new Entities.MemberEntity
            {
                Human = HumanEntityEntry.Entity,
                PartnerID = partnerID,

                IsDeleted = false,
                DeletedAt = null,

                UpdatedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
            }
        );

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessResponseDTO<MemberEntityDTO>> GetAsync(int partnerID, int memberID)
    {
        var memberQuery = _AppDBContext.Members
        .Include(member => member.Human)
        .ThenInclude(human => human!.Image)
        .Include(member => member.Human)
        .ThenInclude(human => human!.Location)
        .Where((member) => member.ID == memberID && member.PartnerID == partnerID);

        var member = await memberQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such member.");

        return new(new(member));
    }

    public async Task<SuccessManyResponseDTO<MemberEntityDTO>> GetManyAsync(int partnerID, MemberFiltrationRequestDTO memberFilters)
    {
        var membersQuery = _AppDBContext.Members
        .Include(member => member.Human)
        .ThenInclude(human => human!.Image)
        .Include(member => member.Human)
        .ThenInclude(human => human!.Location)
        .Where(member => member.PartnerID == partnerID && member.IsDeleted == false);

        if (memberFilters.FirstName != null) membersQuery = membersQuery.Where(member => member.Human!.FirstName.Contains(memberFilters.FirstName));
        if (memberFilters.MidName != null) membersQuery = membersQuery.Where(member => member.Human!.MidName.Contains(memberFilters.MidName));
        if (memberFilters.LastName != null) membersQuery = membersQuery.Where(member => member.Human!.LastName.Contains(memberFilters.LastName));

        if (memberFilters.Location != null)
        {
            if (memberFilters.Location.Country != null) membersQuery = membersQuery.Where(member => member.Human!.Location!.Country.Contains(memberFilters.Location.Country));
            if (memberFilters.Location.City != null) membersQuery = membersQuery.Where(member => member.Human!.Location!.City.Contains(memberFilters.Location.City));
            if (memberFilters.Location.Street != null) membersQuery = membersQuery.Where(member => member.Human!.Location!.Street.Contains(memberFilters.Location.Street));
        }

        if (memberFilters.MinDateOfBirth != null) membersQuery = membersQuery.Where(member => member.Human!.DateOfBirth >= memberFilters.MinDateOfBirth);
        if (memberFilters.MaxDateOfBirth != null) membersQuery = membersQuery.Where(member => member.Human!.DateOfBirth <= memberFilters.MaxDateOfBirth);

        if (memberFilters.PhoneNumber != null) membersQuery = membersQuery.Where(member => member.Human!.PhoneNumber.Contains(memberFilters.PhoneNumber));

        if (memberFilters.Email != null) membersQuery = membersQuery.Where(member => member.Human!.Email.Contains(memberFilters.Email));


        if (memberFilters.IsDeleted == true)
        {
            membersQuery = membersQuery
            .Where(member => member.IsDeleted == memberFilters.IsDeleted);

            if (memberFilters.DeletedAt != null) membersQuery = membersQuery.Where(member => member.DeletedAt == memberFilters.DeletedAt);
            else
            {
                if (memberFilters.DeletedBefore != null) membersQuery = membersQuery.Where(member => member.DeletedAt <= memberFilters.DeletedBefore);
                if (memberFilters.DeletedAfter != null) membersQuery = membersQuery.Where(member => member.DeletedAt >= memberFilters.DeletedAfter);
            }
        }

        if (memberFilters.UpdatedAt != null) membersQuery = membersQuery.Where(member => member.UpdatedAt == memberFilters.UpdatedAt);
        else
        {
            if (memberFilters.UpdatedBefore != null) membersQuery = membersQuery.Where(member => member.UpdatedAt <= memberFilters.UpdatedBefore);
            if (memberFilters.UpdatedAfter != null) membersQuery = membersQuery.Where(member => member.UpdatedAt >= memberFilters.UpdatedAfter);
        }

        if (memberFilters.CreatedAt != null) membersQuery = membersQuery.Where(member => member.CreatedAt == memberFilters.CreatedAt);
        else
        {
            if (memberFilters.CreatedBefore != null) membersQuery = membersQuery.Where(member => member.CreatedAt <= memberFilters.CreatedBefore);
            if (memberFilters.CreatedAfter != null) membersQuery = membersQuery.Where(member => member.CreatedAt >= memberFilters.CreatedAfter);
        }

        var membersTotalFoundRecords = await membersQuery.CountAsync();

        if (memberFilters.Sorting.Ascending == true)
        {
            switch (memberFilters.Sorting.By)
            {
                case MEMBER_SORTING_OPTION_REQUEST_DTO.FULL_NAME:
                    membersQuery = membersQuery
                    .OrderBy(member => member.Human!.FirstName)
                    .ThenBy(member => member.Human!.MidName)
                    .ThenBy(member => member.Human!.LastName);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.DATE_OF_BIRTH:
                    membersQuery = membersQuery.OrderBy(member => member.Human!.DateOfBirth);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    membersQuery = membersQuery.OrderBy(member => member.UpdatedAt);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.DELETION:
                    membersQuery = membersQuery.OrderBy(member => member.UpdatedAt);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    membersQuery = membersQuery.OrderBy(member => member.CreatedAt);
                    break;
            }
        }
        else
        {
            switch (memberFilters.Sorting.By)
            {
                case MEMBER_SORTING_OPTION_REQUEST_DTO.FULL_NAME:
                    membersQuery = membersQuery
                    .OrderByDescending(member => member.Human!.FirstName)
                    .ThenByDescending(member => member.Human!.MidName)
                    .ThenByDescending(member => member.Human!.LastName);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.DATE_OF_BIRTH:
                    membersQuery = membersQuery.OrderByDescending(member => member.Human!.DateOfBirth);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.DELETION:
                    membersQuery = membersQuery.OrderByDescending(member => member.UpdatedAt);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    membersQuery = membersQuery.OrderByDescending(member => member.UpdatedAt);
                    break;

                case MEMBER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    membersQuery = membersQuery.OrderByDescending(member => member.CreatedAt);
                    break;
            }
        }

        membersQuery = membersQuery
        .Skip(memberFilters.Pagination.RequestedPage)
        .Take((int)memberFilters.Pagination.RecordsPerRequest);

        var members = await membersQuery
        .AsNoTracking()
        .Select(member => new MemberEntityDTO(member)).ToArrayAsync();

        return new(
            members,
            new(membersTotalFoundRecords, memberFilters.Pagination.RecordsPerRequest, memberFilters.Pagination.RequestedPage)
        );
    }

};