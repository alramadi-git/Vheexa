using Business.Partner.Validations.Guards;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Services;

public class ClsBranchService
{
    private readonly Database.Partner.Repositories.ClsBranchRepository _Repository;
    private readonly ClsBranchGuard _Guard;


    public ClsBranchService(Database.Partner.Repositories.ClsBranchRepository repository, ClsBranchGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsBranchCreateInput branch, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.CreateOneAsync(branch);

        await _Repository.CreateOneAsync(
            new Database.Partner.Inputs.ClsBranchCreateInput
            {
                Location = new Database.Partner.Inputs.ClsBranchCreateInput.ClsLocationCreateInput
                {
                    Country = branch.Location.Country,
                    City = branch.Location.City,
                    Street = branch.Location.Street,
                    Latitude = branch.Location.Latitude,
                    Longitude = branch.Location.Longitude
                },
                Name = branch.Name,
                PhoneNumber = branch.PhoneNumber,
                Email = branch.Email,
                Status = branch.Status
            },
            memberContext
        );
    }
    public async Task DeleteOneAsync(Guid branchUuid, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(branchUuid, memberContext);
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsBranchModel>> SearchAsync(ClsBranchFilterInput filter, ClsPaginationInput pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);

        var branches = await _Repository.SearchAsync(
            new Database.Partner.Inputs.ClsBranchFilterInput
            {
                Search = filter.Search,
                Status = filter.Status
            },
            new Database.Inputs.ClsPaginationInput
            {
                Page = pagination.Page,
                PageSize = (int)pagination.PageSize
            },
            memberContext
        );

        return branches;
    }
}