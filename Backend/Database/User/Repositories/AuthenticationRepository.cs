using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Database.DTOs;
using Database.User.DTOs;
using Database.Parameters;

namespace Database.User.Repositories;

public class AuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneDTO<UserDTO>> LoginAsync(LoginCredentialsParameter loginCredentials)
    {
        var userQuery = _AppDBContext.Users.AsQueryable();
        userQuery = userQuery.Include(user => user.Human).ThenInclude(human => human.Avatar);
        userQuery = userQuery.Include(user => user.Human).ThenInclude(human => human.Location);

        userQuery = userQuery.Where((user) => user.Human.Email == loginCredentials.Email);
        userQuery = userQuery.Where((user) => user.IsDeleted == false);

        var user = await userQuery.AsNoTracking().FirstOrDefaultAsync()
        ?? throw new ExceptionDTO(STATUS_CODE.UNAUTHORIZED, "No such user.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, user.Human.Password, loginCredentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ExceptionDTO(STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackingUser = await userQuery.FirstAsync();

            trackingUser.Human.Password = passwordHasher.HashPassword(null, loginCredentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new SuccessOneDTO<UserDTO>(new UserDTO(user));
    }
};