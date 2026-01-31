using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsMemberGuard
{
    private readonly ClsMemberCreateValidator _MemberCreateValidator;
    private readonly ClsMemberFilterValidator _MemberFilterValidator;

    private readonly ClsPaginationValidator _PaginationValidator;

    public ClsMemberGuard(
        ClsMemberCreateValidator memberCreateValidator,
        ClsMemberFilterValidator memberFilterValidator,
        ClsPaginationValidator paginationValidator
    )
    {
        _MemberCreateValidator = memberCreateValidator;
        _MemberFilterValidator = memberFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsMemberCreateInput member)
    {
        await _MemberCreateValidator.ValidateAsync(member);
    }
    public async Task SearchAsync(ClsMemberFilterInput filter, ClsPaginationInput pagination)
    {
        await _MemberFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}