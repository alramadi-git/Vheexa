using FluentValidation;

using Business.Validations;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.Repositories.MemberRepositories;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace Business.Services.MemberServices;

public class MemberAuthenticationService
{
    private readonly MemberAuthenticationRepository _MemberAuthenticationRepository;

    public MemberAuthenticationService(MemberAuthenticationRepository memberRepository)
    {
        _MemberAuthenticationRepository = memberRepository;
    }

    public async Task<SuccessOneDTO<MemberEntityDTO>> SigninAsync(CredentialsDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _MemberAuthenticationRepository.SigninAsync(credentials);
    }
}