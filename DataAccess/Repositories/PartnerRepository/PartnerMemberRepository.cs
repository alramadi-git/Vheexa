using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerMemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync() { }

    public async Task<SuccessOneResponseDTO<object?>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var partnerQuery = _AppDBContext.Partners
        .Include(partner => partner.Image)
        .Where((partner) => partner.Email == credentials.Email);

        var partner = await partnerQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such partner.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, partner.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            partner.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new(null);
    }
};