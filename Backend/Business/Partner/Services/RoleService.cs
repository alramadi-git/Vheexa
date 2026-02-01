using Database.Partner.Repositories;

using Business.Partner.Validations.Guards;

using Database.Partner.Contexts;

using Business.Inputs;
using Business.Partner.Inputs;
using Database.Partner.Models;
using Database.Models;

namespace Business.Partner.Services;

public class ClsRoleService
{
    private readonly ClsRoleRepository _Repository;
    private readonly ClsRoleGuard _Guard;

    public ClsRoleService(ClsRoleRepository repository, ClsRoleGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsRoleCreateInput role, ClsMemberContext memberContext)
    {
        await _Guard.CreateOneAsync(role);
        await _Repository.CreateOneAsync(
            new Database.Partner.Inputs.ClsRoleCreateInput
            {
                Name = role.Name,
                Permissions = role.Permissions,
                Status = role.Status
            },
            memberContext
        );
    }
    public async Task<ClsRoleModel> ReadOneAsync(Guid roleUuid, ClsMemberContext memberContext)
    {
        return await _Repository.ReadOneAsync(roleUuid, memberContext);
    }
    public async Task DeleteOneAsync(Guid roleUuid, ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(roleUuid, memberContext);
    }
    public async Task<ClsPaginatedModel<ClsRoleModel>> SearchAsync(ClsRoleFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        return await _Repository.SearchAsync(
            new Database.Partner.Inputs.ClsRoleFilterInput
            {
                Name = filter.Name,
                Permissions = filter.Permissions,
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