using FluentValidation;

using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace Business.Validations.RequestToBeAPartnerValidations;

public class RequestToBeAPartnerFiltrationValidation : AbstractFiltrationValidation<RequestToBeAPartnerFiltrationRequestDTO, REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO>
{
    private static readonly Lazy<RequestToBeAPartnerFiltrationValidation> _Instance = new(() => new());
    public static RequestToBeAPartnerFiltrationValidation Instance => _Instance.Value;

    public RequestToBeAPartnerFiltrationValidation()
    {
        RuleFor(filtration => filtration.PartnerID)
        .GreaterThanOrEqualTo(1).When(filtration => filtration.PartnerID != null).WithMessage("PartnerID must be at least 1.");
   
        RuleFor(filtration => filtration.UpdatedBefore)
        .LessThanOrEqualTo((filtration) => filtration.UpdatedAfter)
        .When(filtration => filtration.UpdatedBefore != null && filtration.UpdatedAfter != null);

        RuleFor(filtration => filtration.CreatedBefore)
        .LessThanOrEqualTo((filtration) => filtration.CreatedAfter)
        .When(filtration => filtration.CreatedBefore != null && filtration.CreatedAfter != null);
    }
}