using Business.Partner.Validations.Guards;

using Business.Integrations;

using Business.Partner.Inputs;

using Business.Filters;
using Business.Partner.Filters;

namespace Business.Partner.Services;

public class ClsMemberService
{
    private readonly Database.Partner.Repositories.ClsMemberRepository _Repository;
    private readonly ClsMemberGuard _Guard;

    private readonly ClsImagekitIntegration _ImagekitIntegration;

    public ClsMemberService(Database.Partner.Repositories.ClsMemberRepository repository, ClsMemberGuard guard, ClsImagekitIntegration imagekitIntegration)
    {
        _Repository = repository;
        _Guard = guard;

        _ImagekitIntegration = imagekitIntegration;
    }

    public async Task CreateOneAsync(ClsMemberInput member, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        string? avatarId = null;

        try
        {
            await _Guard.CreateOneAsync(member);

            var memberUuid = Guid.NewGuid();

            var avatar = member.Avatar == null
            ? null
            : await _ImagekitIntegration.UploadOneAsyncSafe(member.Avatar, $"/vheexa/partners/{memberContext.PartnerUuid}/members/{memberUuid}");

            avatarId = avatar?.Id;

            await _Repository.CreateOneAsync(
                new Database.Partner.Inputs.ClsMemberInput
                {
                    Uuid = memberUuid,
                    Avatar = avatar == null ? null : new Database.Inputs.ClsImageInput
                    {
                        Id = avatar.Id,
                        Url = avatar.Url
                    },
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
        catch
        {
            if (avatarId != null) await _ImagekitIntegration.DeleteImageAsync(avatarId);
            throw;
        }

    }
    public async Task<Database.Partner.Models.ClsOptionModel[]> ReadRolesAsync(Guid[] uuids, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        var roleOptions = await _Repository.ReadRolesAsync(uuids, memberContext);

        return roleOptions;
    }
    public async Task<Database.Partner.Models.ClsOptionModel[]> ReadBranchesAsync(Guid[] uuids, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        var branchOptions = await _Repository.ReadBranchesAsync(uuids, memberContext);

        return branchOptions;
    }
    public async Task DeleteOneAsync(Guid memberUuid, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(memberUuid, memberContext);
        await _ImagekitIntegration.DeleteFolderAsync($"/vheexa/partners/{memberContext.PartnerUuid}/members/{memberUuid}");
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>> SearchRolesAsync(ClsOptionFilterFilter filter, ClsOptionPaginationFilter pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchRolesAsync(filter, pagination);

        var roleOptions = await _Repository.SearchRolesAsync(
            new Database.Partner.Filters.ClsOptionFilter
            {
                Search = filter.Search,
            },
            new Database.Partner.Filters.ClsOptionPaginationFilter
            {
                Page = pagination.Page,
            },
            memberContext
        );

        return roleOptions;
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>> SearchBranchesAsync(ClsOptionFilterFilter filter, ClsOptionPaginationFilter pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchBranchesAsync(filter, pagination);

        var branchOptions = await _Repository.SearchBranchesAsync(
            new Database.Partner.Filters.ClsOptionFilter
            {
                Search = filter.Search,
            },
            new Database.Partner.Filters.ClsOptionPaginationFilter
            {
                Page = pagination.Page,
            },
            memberContext
        );

        return branchOptions;
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsMemberModel>> SearchAsync(ClsMemberFilter filter, ClsPaginationFilter pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);

        var members = await _Repository.SearchAsync(
            new Database.Partner.Filters.ClsMemberFilter
            {
                Search = filter.Search,
                RoleUuids = filter.RoleUuids,
                BranchUuids = filter.BranchUuids,
                Status = filter.Status
            },
            new Database.Filters.ClsPaginationFilter
            {
                Page = pagination.Page,
                PageSize = (int)pagination.PageSize
            },
            memberContext
        );

        return members;
    }
}