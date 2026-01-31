using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsBranchGuard
{
    private readonly ClsBranchCreateValidator _BranchCreateValidator;
    private readonly ClsBranchFilterValidator _BranchFilterValidator;

    private readonly ClsPaginationValidator _PaginationValidator;

    public ClsBranchGuard(
        ClsBranchCreateValidator branchCreateValidator,
        ClsBranchFilterValidator branchFilterValidator,
        ClsPaginationValidator paginationValidator
    )
    {
        _BranchCreateValidator = branchCreateValidator;
        _BranchFilterValidator = branchFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsBranchCreateInput branch)
    {
        await _BranchCreateValidator.ValidateAsync(branch);
    }
    public async Task SearchAsync(ClsBranchFilterInput filter, ClsPaginationInput pagination)
    {
        await _BranchFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}