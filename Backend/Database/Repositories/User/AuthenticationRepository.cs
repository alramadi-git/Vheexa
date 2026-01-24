using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using Database.Parameters;

using Database.DTOs.User;
using Database.DTOs.Abstracts;
using Database.DTOs;

namespace Database.Repositories.User;

public class AuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsSuccessDTO<ClsUserDTO>> LoginAsync(LoginCredentialsParameter loginCredentials)
    {
        var userQuery = _AppDBContext.Users.AsQueryable();
        userQuery = userQuery.Include(user => user.Human).ThenInclude(human => human.Avatar);
        userQuery = userQuery.Include(user => user.Human).ThenInclude(human => human.Location);

        userQuery = userQuery.Where((user) => user.Human.Email == loginCredentials.Email);
        userQuery = userQuery.Where((user) => user.IsDeleted == false);

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync()
        ?? throw new ClsExceptionDTO(HTTP_STATUS_CODE.UNAUTHORIZED, "No such user.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, user.Human.Password, loginCredentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ClsExceptionDTO(HTTP_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackingUser = await userQuery.FirstAsync();

            trackingUser.Human.Password = passwordHasher.HashPassword(null, loginCredentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new ClsSuccessDTO<ClsUserDTO>(new ClsUserDTO(user));
    }
};