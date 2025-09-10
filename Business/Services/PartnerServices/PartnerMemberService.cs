using FluentValidation;

using Business.Validations.MemberValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.PartnerServices;

public class PartnerMemberService
{
    private readonly PartnerMemberRepository _PartnerMemberRepository;

    public PartnerMemberService(PartnerMemberRepository partnerMemberRepository)
    {
        _PartnerMemberRepository = partnerMemberRepository;
    }

    public async Task AddAsync(int partnerMemberID, MemberCreateRequestDTO partnerMemberAddData)
    {
        MemberCreateValidation.Instance.ValidateAndThrow(partnerMemberAddData);
        await _PartnerMemberRepository.AddAsync(partnerMemberID, partnerMemberAddData);
    }

    public async Task<DataAccess.ResponseDTOs.SuccessOneResponseDTO<MemberEntityDTO>> GetAsync(int partnerID, int memberID)
    {
        var memberIDValidation = new InlineValidator<int>();

        memberIDValidation.RuleFor(memberID => memberID)
        .GreaterThanOrEqualTo(1);

        memberIDValidation.ValidateAndThrow(memberID);

        return await _PartnerMemberRepository.GetAsync(partnerID, memberID);
    }

    public async Task<DataAccess.ResponseDTOs.SuccessManyResponseDTO<MemberEntityDTO>> GetManyAsync(int partnerMemberID, MemberFiltrationRequestDTO MemberFiltration)
    {
        MemberFiltrationValidation.Instance.ValidateAndThrow(MemberFiltration);
        return await _PartnerMemberRepository.GetManyAsync(partnerMemberID, MemberFiltration);
    }
}