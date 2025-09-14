using FluentValidation;

using Business.Validations;
using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.Repositories.MemberRepositories;

namespace Business.Services.MemberServices;

public class MemberAuthenticationService
{
    private readonly MemberAuthenticationRepository _MemberAuthenticationRepository;

    public MemberAuthenticationService(MemberAuthenticationRepository memberRepository)
    {
        _MemberAuthenticationRepository = memberRepository;
    }

    public async Task<SuccessResponseDTO<MemberEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _MemberAuthenticationRepository.SigninAsync(credentials);
    }
}