using Database.Partner.Repositories;

using Business.Partner.Validations.Guards;

using Database.Partner.Contexts;

using Business.Inputs;
using Business.Partner.Inputs;

using Database.Partner.Models;
using Database.Models;

namespace Business.Partner.Services;

public class ClsMemberService
{
    private readonly ClsMemberRepository _Repository;
    private readonly ClsMemberGuard _Guard;


    public ClsMemberService(ClsMemberRepository repository, ClsMemberGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsMemberCreateInput member, ClsMemberContext memberContext)
    {
        // TODO: make the ImageKit integration and replace the "url" with a real one 
        await _Guard.CreateOneAsync(member);
        await _Repository.CreateOneAsync(
            new Database.Partner.Inputs.ClsMemberCreateInput
            {
                Avatar = "url",
                RoleUuid = member.RoleUuid,
                BranchUuid = member.BranchUuid,
                Username = member.Username,
                Email = member.Email,
                Password = member.Password,
                Status = member.Status
            },
            memberContext
        );
    }
    public async Task<ClsMemberModel> ReadOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        return await _Repository.ReadOneAsync(memberUuid, memberContext);
    }
    public async Task DeleteOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(memberUuid, memberContext);
    }
    public async Task<ClsPaginatedModel<ClsMemberModel>> SearchAsync(ClsMemberFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        return await _Repository.SearchAsync(
            new Database.Partner.Inputs.ClsMemberFilterInput
            {
                Search = filter.Search,
                RoleUuids = filter.RoleUuids,
                BranchUuids = filter.BranchUuids,
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