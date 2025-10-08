using FluentValidation;

using Business.Validations;
using Business.Validations.PartnerValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

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

    public async Task<SuccessOneDTO<PartnerEntityDTO>> SigninAsync(CredentialsDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _PartnerAuthenticationRepository.SigninAsync(credentials);
    }
}