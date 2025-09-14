using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessResponseDTO<AdminEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var adminQuery = _AppDBContext.Admins
        .Include(admin => admin.Human).ThenInclude(human => human!.Image)
        .Include(admin => admin.Human).ThenInclude(human => human!.Location)
        .Where((admin) => admin.Human!.Email == credentials.Email);

        var admin = await adminQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such admin.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, admin.Human!.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            admin.Human!.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new(new(admin));
    }
};