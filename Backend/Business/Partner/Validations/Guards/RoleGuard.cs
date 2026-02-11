using FluentValidation;

using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Partner.Inputs;

using Business.Filters;
using Business.Partner.Filters;


namespace Business.Partner.Validations.Guards;

public class ClsRoleGuard
{
    private readonly ClsRoleInputValidator _RoleCreateValidator;
    private readonly ClsRoleFilterValidator _RoleFilterValidator;

    private readonly ClsPaginationFilterValidator _PaginationValidator;

    public ClsRoleGuard(
        ClsRoleInputValidator roleCreateValidator,
        ClsRoleFilterValidator roleFilterValidator,
        ClsPaginationFilterValidator paginationValidator
    )
    {
        _RoleCreateValidator = roleCreateValidator;
        _RoleFilterValidator = roleFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsRoleInput role)
    {
        await _RoleCreateValidator.ValidateAndThrowAsync(role);
    }
    public async Task SearchAsync(ClsRoleFilter filter, ClsPaginationFilter pagination)
    {
        await _RoleFilterValidator.ValidateAndThrowAsync(filter);
        await _PaginationValidator.ValidateAndThrowAsync(pagination);
    }
}