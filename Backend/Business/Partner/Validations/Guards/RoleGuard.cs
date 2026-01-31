using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsRoleGuard
{
    private readonly ClsRoleCreateValidator _RoleCreateValidator;
    private readonly ClsRoleFilterValidator _RoleFilterValidator;

    private readonly ClsPaginationValidator _PaginationValidator;

    public ClsRoleGuard(
        ClsRoleCreateValidator roleCreateValidator,
        ClsRoleFilterValidator roleFilterValidator,
        ClsPaginationValidator paginationValidator
    )
    {
        _RoleCreateValidator = roleCreateValidator;
        _RoleFilterValidator = roleFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsRoleCreateInput role)
    {
        await _RoleCreateValidator.ValidateAsync(role);
    }
    public async Task SearchAsync(ClsRoleFilterInput filter, ClsPaginationInput pagination)
    {
        await _RoleFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}