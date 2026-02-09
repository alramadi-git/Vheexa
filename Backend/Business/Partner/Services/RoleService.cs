using Business.Partner.Validations.Guards;

using Business.Partner.Inputs;

using Business.Filters;
using Business.Partner.Filters;

namespace Business.Partner.Services;

public class ClsRoleService
{
    private readonly Database.Partner.Repositories.ClsRoleRepository _Repository;
    private readonly ClsRoleGuard _Guard;

    public ClsRoleService(Database.Partner.Repositories.ClsRoleRepository repository, ClsRoleGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsRoleInput role, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.CreateOneAsync(role);
        await _Repository.CreateOneAsync(
            new Database.Partner.Inputs.ClsRoleInput
            {
                Name = role.Name,
                Permissions = role.Permissions,
                Status = role.Status
            },
            memberContext
        );
    }
    public async Task DeleteOneAsync(Guid roleUuid, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(roleUuid, memberContext);
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsRoleModel>> SearchAsync(ClsRoleFilter filter, ClsPaginationFilter pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        return await _Repository.SearchAsync(
            new Database.Partner.Filters.ClsRoleFilter
            {
                Name = filter.Name,
                Permissions = filter.Permissions,
                Status = filter.Status
            },
            new Database.Filters.ClsPaginationFilter
            {
                Page = pagination.Page,
                PageSize = (int)pagination.PageSize
            },
            memberContext
        );
    }
}