using FluentValidation;

using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Partner.Inputs;

using Business.Filters;
using Business.Partner.Filters;

namespace Business.Partner.Validations.Guards;

public class ClsMemberGuard
{
    private readonly ClsMemberInputValidator _MemberCreateValidator;
    private readonly ClsMemberFilterValidator _MemberFilterValidator;

    private readonly ClsOptionFilterValidator _OptionFilterValidator;
    private readonly ClsOptionPaginationFilterValidator _OptionPaginationValidator;

    private readonly ClsPaginationFilterValidator _PaginationValidator;

    public ClsMemberGuard(
        ClsMemberInputValidator memberCreateValidator,
        ClsMemberFilterValidator memberFilterValidator,
        ClsOptionFilterValidator optionFilterValidator,
        ClsOptionPaginationFilterValidator optionPaginationValidator,
        ClsPaginationFilterValidator paginationValidator
    )
    {
        _MemberCreateValidator = memberCreateValidator;
        _MemberFilterValidator = memberFilterValidator;

        _OptionFilterValidator = optionFilterValidator;
        _OptionPaginationValidator = optionPaginationValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsMemberInput member)
    {
        await _MemberCreateValidator.ValidateAndThrowAsync(member);
    }
    public async Task SearchRolesAsync(ClsOptionFilterFilter filter, ClsOptionPaginationFilter pagination)
    {
        await _OptionFilterValidator.ValidateAndThrowAsync(filter);
        await _OptionPaginationValidator.ValidateAndThrowAsync(pagination);
    }
    public async Task SearchBranchesAsync(ClsOptionFilterFilter filter, ClsOptionPaginationFilter pagination)
    {
        await _OptionFilterValidator.ValidateAndThrowAsync(filter);
        await _OptionPaginationValidator.ValidateAndThrowAsync(pagination);
    }
    public async Task SearchAsync(ClsMemberFilter filter, ClsPaginationFilter pagination)
    {
        await _MemberFilterValidator.ValidateAndThrowAsync(filter);
        await _PaginationValidator.ValidateAndThrowAsync(pagination);
    }
}