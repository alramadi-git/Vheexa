using FluentValidation;

using Business.Validations.PartnerSupportedLocationValidations;

using DataAccess.Repositories.PartnerRepository;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.User.DTOs.Responses;

namespace Business.Services.PartnerServices;

public class PartnerSupportedLocationService
{
    private readonly PartnerSupportedLocationRepository _PartnerSupportedLocationRepository;

    public PartnerSupportedLocationService(PartnerSupportedLocationRepository partnerSupportedLocationRepository)
    {
        _PartnerSupportedLocationRepository = partnerSupportedLocationRepository;
    }

    public async Task<SuccessOneDTO<PartnerSupportedLocationEntityDTO>> GetAsync(int partnerID, int supportedLocationID)
    {
        var supportedLocationIDValidation = new InlineValidator<int>();

        supportedLocationIDValidation.RuleFor(supportedLocationID => supportedLocationID)
        .GreaterThanOrEqualTo(1);

        supportedLocationIDValidation.ValidateAndThrow(supportedLocationID);

        return await _PartnerSupportedLocationRepository.GetAsync(partnerID, supportedLocationID);
    }

    public async Task<SuccessManyDTO<PartnerSupportedLocationEntityDTO>> GetManyAsync(int partnerSupportedLocationID, PartnerSupportedLocationFiltrationRequestDTO partnerSupportedLocationFiltration)
    {
        PartnerSupportedLocationFiltrationValidation.Instance.ValidateAndThrow(partnerSupportedLocationFiltration);
        return await _PartnerSupportedLocationRepository.GetManyAsync(partnerSupportedLocationID, partnerSupportedLocationFiltration);
    }
}