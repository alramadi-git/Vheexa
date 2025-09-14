using FluentValidation;

using Business.Validations;
using Business.Validations.PartnerValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.PartnerServices;

public class PartnerAuthenticationService
{
    private readonly PartnerAuthenticationRepository _PartnerAuthenticationRepository;

    public PartnerAuthenticationService(PartnerAuthenticationRepository partnerRepository)
    {
        _PartnerAuthenticationRepository = partnerRepository;
    }

    public async Task SignupAsync(PartnerCreateRequestDTO partnerSignup)
    {
        PartnerCreateValidation.Instance.ValidateAndThrow(partnerSignup);
        await _PartnerAuthenticationRepository.SignupAsync(partnerSignup);
    }

    public async Task<SuccessResponseDTO<PartnerEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _PartnerAuthenticationRepository.SigninAsync(credentials);
    }
}