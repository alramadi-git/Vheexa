using Business.Validations.Validators;
using Business.Partner.Validations.Validators;
using Business.Partner.Inputs;
using Business.Filters;
using Business.Partner.Filters;

namespace Business.Partner.Validations.Guards;

public class ClsBranchGuard
{
    private readonly ClsBranchInputValidator _BranchCreateValidator;
    private readonly ClsBranchFilterValidator _BranchFilterValidator;

    private readonly ClsPaginationFilterValidator _PaginationValidator;

    public ClsBranchGuard(
        ClsBranchInputValidator branchCreateValidator,
        ClsBranchFilterValidator branchFilterValidator,
        ClsPaginationFilterValidator paginationValidator
    )
    {
        _BranchCreateValidator = branchCreateValidator;
        _BranchFilterValidator = branchFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsBranchInput branch)
    {
        await _BranchCreateValidator.ValidateAsync(branch);
    }
    public async Task SearchAsync(ClsBranchFilter filter, ClsPaginationFilter pagination)
    {
        await _BranchFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}