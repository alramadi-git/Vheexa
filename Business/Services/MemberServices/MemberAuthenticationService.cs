using FluentValidation;

using Business.Validations;

using DataAccess.Repositories.MemberRepository;
using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace Business.Services.MemberServices;

public class MemberAuthenticationService
{
    private readonly MemberAuthenticationRepository _MemberAuthenticationRepository;

    public MemberAuthenticationService(MemberAuthenticationRepository memberRepository)
    {
        _MemberAuthenticationRepository = memberRepository;
    }

    public async Task<SuccessOneResponseDTO<MemberEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _MemberAuthenticationRepository.SigninAsync(credentials);
    }
}