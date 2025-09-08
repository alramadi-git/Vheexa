using FluentValidation;

using Business.Validations.PartnerValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Services.PartnerServices;

public class PartnerService
{
    private readonly PartnerRepository _PartnerRepository;

    public PartnerService(PartnerRepository partnerRepository)
    {
        _PartnerRepository = partnerRepository;
    }

    public async Task UpdateAsync(int partnerID, PartnerUpdateRequestDTO partnerUpdatedData)
    {
        PartnerUpdateValidation.Instance.ValidateAndThrow(partnerUpdatedData);
        await _PartnerRepository.UpdateAsync(partnerID, partnerUpdatedData);
    }
}