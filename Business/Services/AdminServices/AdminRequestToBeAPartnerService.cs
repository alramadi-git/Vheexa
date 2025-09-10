using FluentValidation;

using Business.Validations.RequestToBeAPartnerValidations;

using DataAccess.Repositories.AdminRepository;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.AdminServices;

public class AdminRequestToBeAPartnerService
{
    private readonly AdminRequestToBeAPartnerRepository _AdminRequestToBeAPartnerRepository;

    public AdminRequestToBeAPartnerService(AdminRequestToBeAPartnerRepository adminRequestToBeAPartnerRepository)
    {
        _AdminRequestToBeAPartnerRepository = adminRequestToBeAPartnerRepository;
    }

    public async Task<SuccessOneResponseDTO<RequestToBeAPartnerEntityDTO>> GetAsync(int requestToBeAPartnerID)
    {
        var IDValidation = new InlineValidator<int>();

        IDValidation.RuleFor(ID => ID).GreaterThanOrEqualTo(1);
        IDValidation.ValidateAndThrow(requestToBeAPartnerID);

        return await _AdminRequestToBeAPartnerRepository.GetAsync(requestToBeAPartnerID);
    }

    public async Task UpdateAsync(int adminID, int requestToBeAPartnerID, RequestToBeAPartnerUpdateRequestDTO requestToBeAPartnerUpdatedData)
    {
        await _AdminRequestToBeAPartnerRepository.UpdateAsync(adminID, requestToBeAPartnerID, requestToBeAPartnerUpdatedData);
    }

    public async Task<SuccessManyResponseDTO<RequestToBeAPartnerEntityDTO>> GetManyAsync(RequestToBeAPartnerFiltrationRequestDTO requestsToBeAPartnerFiltration)
    {
        RequestToBeAPartnerFiltrationValidation.Instance.ValidateAndThrow(requestsToBeAPartnerFiltration);
        return await _AdminRequestToBeAPartnerRepository.GetManyAsync(requestsToBeAPartnerFiltration);
    }
}