using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsMemberGuard
{
    private readonly ClsMemberCreateValidator _MemberCreateValidator;
    private readonly ClsMemberFilterValidator _MemberFilterValidator;

    private readonly ClsOptionFilterValidator _OptionFilterValidator;
    private readonly ClsOptionPaginationValidator _OptionPaginationValidator;

    private readonly ClsPaginationValidator _PaginationValidator;

    public ClsMemberGuard(
        ClsMemberCreateValidator memberCreateValidator,
        ClsMemberFilterValidator memberFilterValidator,
        ClsOptionFilterValidator optionFilterValidator,
        ClsOptionPaginationValidator optionPaginationValidator,
        ClsPaginationValidator paginationValidator
    )
    {
        _MemberCreateValidator = memberCreateValidator;
        _MemberFilterValidator = memberFilterValidator;

        _OptionFilterValidator = optionFilterValidator;
        _OptionPaginationValidator = optionPaginationValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsMemberCreateInput member)
    {
        await _MemberCreateValidator.ValidateAsync(member);
    }
    public async Task SearchRolesAsync(ClsOptionFilterInput filter, ClsOptionPaginationInput pagination)
    {
        await _OptionFilterValidator.ValidateAsync(filter);
        await _OptionPaginationValidator.ValidateAsync(pagination);
    }
    public async Task SearchBranchesAsync(ClsOptionFilterInput filter, ClsOptionPaginationInput pagination)
    {
        await _OptionFilterValidator.ValidateAsync(filter);
        await _OptionPaginationValidator.ValidateAsync(pagination);
    }
    public async Task SearchAsync(ClsMemberFilterInput filter, ClsPaginationInput pagination)
    {
        await _MemberFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}