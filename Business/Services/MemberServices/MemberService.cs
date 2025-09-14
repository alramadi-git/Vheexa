using FluentValidation;

using Business.Validations.MemberValidations;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.Repositories.MemberRepositories;

namespace Business.Services.MemberServices;

public class MemberService
{
    private readonly MemberRepository _MemberRepository;

    public MemberService(MemberRepository memberRepository)
    {
        _MemberRepository = memberRepository;
    }

    public async Task UpdateAsync(int memberID, MemberUpdateRequestDTO memberUpdatedData)
    {
        MemberUpdateValidation.Instance.ValidateAndThrow(memberUpdatedData);
        await _MemberRepository.UpdateAsync(memberID, memberUpdatedData);
    }
}