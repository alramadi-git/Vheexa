using Database.Partner.Repositories;

using Business.Partner.Validations.Guards;

using Database.Partner.Contexts;

using Business.Inputs;
using Business.Partner.Inputs;
using Database.Partner.Models;
using Database.Models;

namespace Business.Partner.Services;

public class ClsBranchService
{
    private readonly ClsBranchRepository _Repository;
    private readonly ClsBranchGuard _Guard;


    public ClsBranchService(ClsBranchRepository repository, ClsBranchGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsBranchCreateInput branch, ClsMemberContext memberContext)
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
    public async Task<ClsBranchModel> ReadOneAsync(Guid branchUuid, ClsMemberContext memberContext)
    {
        return await _Repository.ReadOneAsync(branchUuid, memberContext);
    }
    public async Task DeleteOneAsync(Guid branchUuid, ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(branchUuid, memberContext);
    }
    public async Task<ClsPaginatedModel<ClsBranchModel>> SearchAsync(ClsBranchFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        return await _Repository.SearchAsync(
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
    }
}