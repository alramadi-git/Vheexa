using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using DataAccess.Entities;
using DataAccess.RequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task SignupAsync(PartnerCreateRequestDTO partnerSignedupData)
    {
        var isHandle_EmailOrPhoneNumberInUseQuery = _AppDBContext.Partners
        .Where((partner) =>
            partner.Handle == partnerSignedupData.Handle ||
            partner.Email == partnerSignedupData.Email ||
            partner.PhoneNumber == partnerSignedupData.PhoneNumber
        );

        var isHandleOrEmailOrPhoneNumberInUse = await isHandle_EmailOrPhoneNumberInUseQuery.AnyAsync();
        if (isHandleOrEmailOrPhoneNumberInUse == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "Handle, email or phone number already in use.");
        
        var imageEntityEntry = partnerSignedupData.Image == null
        ? null
        : _AppDBContext.Images
        .Add(new ImageEntity
        {
            URL = partnerSignedupData.Image.URL,
        });

        var passwordHasher = new PasswordHasher<object?>();
        var hashedPassword = passwordHasher.HashPassword(null, partnerSignedupData.Password);

        var partnerEntityEntry = _AppDBContext.Partners
        .Add(new PartnerEntity
        {
            Image = imageEntityEntry?.Entity,
            Handle = partnerSignedupData.Handle,
            Name = partnerSignedupData.Name,
            PhoneNumber = partnerSignedupData.PhoneNumber,
            Email = partnerSignedupData.Email,
            Password = hashedPassword,
            AverageRates = 0,
            IsPublished = false,
            IsDeleted = false,
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        });

        _AppDBContext.RequestsToBeAPartner
        .Add(new RequestToBeAPartnerEntity
        {
            Partner = partnerEntityEntry.Entity,
            Status = REQUEST_TO_BE_A_PARTNER_STATUS.PENDING,
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessOneResponseDTO<PartnerEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var partnerQuery = _AppDBContext.Partners
        .Include(partner => partner.Image)
        .Where((partner) =>
            partner.Email == credentials.Email
        );

        var partner = await partnerQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner email.");

        if (partner.IsPublished == false) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Partner is not published yet.");
        if (partner.IsDeleted == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Partner is deleted — contact admin to retrieve your account.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, partner.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var updatablePartner = await partnerQuery.FirstAsync();

            updatablePartner.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new(new(partner));
    }
};