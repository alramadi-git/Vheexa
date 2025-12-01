using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Database.DTOs;
// using Database.Member.DTOs;
using Database.Parameters;

namespace Database.Repositories.Partner;

public class AuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    // public async Task<SuccessOneDTO<MemberDTO>> LoginAsync(LoginCredentialsParameter loginCredentials)
    // {
    //     var memberQuery = _AppDBContext.Members.AsQueryable();
    //     memberQuery = memberQuery.Include(member => member.Human).ThenInclude(human => human.Avatar);
    //     memberQuery = memberQuery.Include(member => member.Human).ThenInclude(human => human.Location);

    //     memberQuery = memberQuery.Where((member) => member.Human.Email == loginCredentials.Email);
    //     memberQuery = memberQuery.Where((member) => member.IsDeleted == false);

    //     var member = await memberQuery.AsNoTracking().FirstOrDefaultAsync()
    //     ?? throw new ExceptionDTO(STATUS_CODE.UNAUTHORIZED, "No such member.");

    //     var passwordHasher = new PasswordHasher<object?>();
    //     var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, member.Human.Password, loginCredentials.Password);

    //     if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ExceptionDTO(STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
    //     if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
    //     {
    //         var trackingMember = await memberQuery.FirstAsync();

    //         trackingMember.Human.Password = passwordHasher.HashPassword(null, loginCredentials.Password);
    //         await _AppDBContext.SaveChangesAsync();
    //     }

    //     return new SuccessOneDTO<MemberDTO>(new MemberDTO(member));
    // }
};