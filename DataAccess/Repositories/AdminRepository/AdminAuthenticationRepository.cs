using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneResponseDTO<AdminEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var humanQuery = _AppDBContext.Humans
        .Include(human => human.Image)
        .Include(human => human.Address)
        .Where((human) => human.Email == credentials.Email)
        .AsNoTracking();

        var human = await humanQuery.FirstOrDefaultAsync();
        if (human == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such email.");

        var hasher = new PasswordHasher<object?>();
        var verifyPassword = hasher.VerifyHashedPassword(null, human.Password, credentials.Password);

        if (verifyPassword == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (verifyPassword == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var humanUpdateQuery = _AppDBContext.Humans
            .Where((human) => human.Email == credentials.Email);

            var humanUpdate = await humanUpdateQuery.FirstOrDefaultAsync();

            humanUpdate!.Password = hasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.HumanID == human.ID && admin.IsDeleted == false)
        .AsNoTracking();

        var admin = await adminQuery.FirstOrDefaultAsync();
        if (admin == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such admin.");

        admin.Human = human;
        return new(new(admin));
    }

    public async Task ResetPassword(string email, string newPassword)
    {
        var humanQuery = _AppDBContext.Humans
        .Where((human) => human.Email == email);

        var human = await humanQuery.FirstOrDefaultAsync();
        if (human == null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such email.");

        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.HumanID == human.ID && admin.IsDeleted == false)
        .AsNoTracking();
        
        var isAdmin = await adminQuery.AnyAsync();
        if (isAdmin == false) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such admin.");

        var hasher = new PasswordHasher<object?>();
        human.Password = hasher.HashPassword(null, newPassword);

        await _AppDBContext.SaveChangesAsync();
    }
};