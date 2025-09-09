using FluentValidation;

using DataAccess.RequestDTOs.FiltersRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.MemberValidations;

public class MemberFiltrationValidation : AbstractHumanFiltrationValidation<MemberFiltrationRequestDTO, MEMBER_SORTING_OPTION_REQUEST_DTO>
{
    private static readonly Lazy<MemberFiltrationValidation> _Instance = new(() => new());
    public static MemberFiltrationValidation Instance => _Instance.Value;

    public MemberFiltrationValidation()
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