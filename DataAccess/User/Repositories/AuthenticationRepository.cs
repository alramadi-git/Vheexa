using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace DataAccess.User.Repositories;

public class AuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneDTO<UserDTO>> SigninAsync(CredentialsDTO credentials)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human).ThenInclude(human => human.Avatar)
        .Include(user => user.Human).ThenInclude(human => human.Location)
        .Where((user) => user.IsDeleted == false)
        .Where((user) => user.Human.Email == credentials.Email);

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorDTO(STATUS_CODE.UNAUTHORIZED, "No such user.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, user.Human.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorDTO(STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackingUser = await userQuery.FirstAsync();

            trackingUser.Human.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new SuccessOneDTO<UserDTO>(new UserDTO(user));
    }
};