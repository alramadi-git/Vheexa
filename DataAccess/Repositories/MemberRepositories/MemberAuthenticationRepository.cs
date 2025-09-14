using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessResponseDTO<MemberEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var memberQuery = _AppDBContext.Members
        .Include(member => member.Human).ThenInclude(human => human!.Image)
        .Include(member => member.Human).ThenInclude(human => human!.Location)
        .Where((member) => member.Human!.Email == credentials.Email);

        var member = await memberQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such member.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, member.Human!.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var updatableMember = await memberQuery.FirstAsync();

            updatableMember.Human!.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new(new(member));
    }
};