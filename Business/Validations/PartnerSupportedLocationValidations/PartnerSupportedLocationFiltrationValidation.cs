using FluentValidation;

using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace Business.Validations.PartnerSupportedLocationValidations;

public class PartnerSupportedLocationFiltrationValidation : AbstractFiltrationValidation<PartnerSupportedLocationFiltrationRequestDTO, PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO>
{
    private static readonly Lazy<PartnerSupportedLocationFiltrationValidation> _Instance = new(() => new());
    public static PartnerSupportedLocationFiltrationValidation Instance => _Instance.Value;

    public PartnerSupportedLocationFiltrationValidation()
    {
        /** Deleted */
        RuleFor(filter => filter.DeletedBefore)
        .LessThanOrEqualTo((filter) => filter.DeletedAfter)
        .When(filter => filter.DeletedBefore != null && filter.DeletedAfter != null);

        /** Updated */
        RuleFor(filter => filter.UpdatedBefore)
        .LessThanOrEqualTo((filter) => filter.UpdatedAfter)
        .When(filter => filter.UpdatedBefore != null && filter.UpdatedAfter != null);

        /** Created */
        RuleFor(filter => filter.CreatedBefore)
        .LessThanOrEqualTo((filter) => filter.CreatedAfter)
        .When(filter => filter.CreatedBefore != null && filter.CreatedAfter != null);
    }
}