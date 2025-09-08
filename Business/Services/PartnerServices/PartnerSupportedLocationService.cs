using FluentValidation;

using Business.Validations.PartnerSupportedLocationValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace Business.Services.PartnerServices;

public class PartnerSupportedLocationService
{
    private readonly PartnerSupportedLocationRepository _PartnerSupportedLocationRepository;

    public PartnerSupportedLocationService(PartnerSupportedLocationRepository partnerSupportedLocationRepository)
    {
        _PartnerSupportedLocationRepository = partnerSupportedLocationRepository;
    }

    public async Task<DataAccess.ResponseDTOs.SuccessOneResponseDTO<DataAccess.EntityDTOs.PartnerSupportedLocationEntityDTO>> GetAsync(int partnerID, int supportedLocationID)
    {
        var supportedLocationIDValidation = new InlineValidator<int>();

        supportedLocationIDValidation.RuleFor(supportedLocationID => supportedLocationID)
        .GreaterThanOrEqualTo(1);

        supportedLocationIDValidation.ValidateAndThrow(supportedLocationID);

        return await _PartnerSupportedLocationRepository.GetAsync(partnerID, supportedLocationID);
    }

    public async Task<DataAccess.ResponseDTOs.SuccessManyResponseDTO<DataAccess.EntityDTOs.PartnerSupportedLocationEntityDTO>> GetManyAsync(int partnerSupportedLocationID, PartnerSupportedLocationFiltrationRequestDTO partnerSupportedLocationFiltration)
    {
        PartnerSupportedLocationFiltrationValidation.Instance.ValidateAndThrow(partnerSupportedLocationFiltration);
        return await _PartnerSupportedLocationRepository.GetManyAsync(partnerSupportedLocationID, partnerSupportedLocationFiltration);
    }
}