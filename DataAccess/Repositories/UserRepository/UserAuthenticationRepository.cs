using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.UserRepository;

public class UserAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task SignupAsync(UserSignupRequestDTO signedupUserData)
    {
        var isEmailOrPhoneNumberInUseQuery = _AppDBContext.Humans
        .Where(human => human.Email == signedupUserData.Email || human.PhoneNumber == signedupUserData.PhoneNumber);

        var isEmailOrPhoneNumberInUse = await isEmailOrPhoneNumberInUseQuery.AnyAsync();
        if (isEmailOrPhoneNumberInUse == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "Email or phone number is already in use | If you deleted your account with those credentials, please contact us to restore your account.");

        var imageEntityEntry = signedupUserData.Image == null
        ? null
        : _AppDBContext.Images
        .Add(new Entities.ImageEntity { URL = signedupUserData.Image.URL, Alternate = signedupUserData.Image.Alternate });

        var AddressEntityEntry = _AppDBContext.Addresses.Add(
        new Entities.AddressEntity
        {
            URL = signedupUserData.Address.URL,

            Country = signedupUserData.Address.Country,
            City = signedupUserData.Address.City,
            Street = signedupUserData.Address.Street,
        });

        var passwordHasher = new PasswordHasher<object?>();
        var HumanEntityEntry = _AppDBContext.Humans.Add(
        new Entities.HumanEntity
        {
            Image = imageEntityEntry?.Entity,
            Address = AddressEntityEntry.Entity,

            FirstName = signedupUserData.FirstName,
            MidName = signedupUserData.MidName,
            LastName = signedupUserData.LastName,

            DateOfBirth = signedupUserData.DateOfBirth,

            PhoneNumber = signedupUserData.PhoneNumber,

            Email = signedupUserData.Email,
            Password = passwordHasher.HashPassword(null, signedupUserData.Password),
        });

        var UserEntityEntry = _AppDBContext.Users
        .Add(
            new Entities.UserEntity
            {
                Human = HumanEntityEntry.Entity,
                AverageRates = 0,

                IsDeleted = false,
                DeletedAt = null,

                UpdatedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
            }
        );

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        var userQuery = _AppDBContext.Users
        .Include(user => user.Human).ThenInclude(human => human!.Image)
        .Include(user => user.Human).ThenInclude(human => human!.Address)
        .Where((user) => user.Human!.Email == credentials.Email);

        var user = await userQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "No such user.");

        var passwordHasher = new PasswordHasher<object?>();
        var passwordVerifyResult = passwordHasher.VerifyHashedPassword(null, user.Human!.Password, credentials.Password);

        if (passwordVerifyResult == PasswordVerificationResult.Failed) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.UNAUTHORIZED, "Incorrect password.");
        if (passwordVerifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.Human!.Password = passwordHasher.HashPassword(null, credentials.Password);
            await _AppDBContext.SaveChangesAsync();
        }

        return new(new(user));
    }
};