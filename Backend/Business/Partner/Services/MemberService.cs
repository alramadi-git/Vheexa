using Business.Partner.Validations.Guards;

using Business.Integrations;

using Business.Inputs;
using Business.Partner.Inputs;

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

    public async Task CreateOneAsync(ClsMemberCreateInput member, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        ClsImagekitIntegration.ClsImagekit? uploadedAvatar = null;
        try
        {
            await _Guard.CreateOneAsync(member);

            var memberUuid = Guid.NewGuid();

            var avatar = member.Avatar == null ? null : await _ImagekitIntegration.UploadOneAsyncSafe(member.Avatar, $"/partners/{memberContext.PartnerUuid}/members/{memberUuid}");

            uploadedAvatar = avatar;

            await _Repository.CreateOneAsync(
                new Database.Partner.Inputs.ClsMemberCreateInput
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
            if (uploadedAvatar != null) await _ImagekitIntegration.DeleteImageAsync(uploadedAvatar.Id);
            throw;
        }

    }
    public async Task DeleteOneAsync(Guid memberUuid, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(memberUuid, memberContext);
    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsMemberModel>> SearchAsync(ClsMemberFilterInput filter, ClsPaginationInput pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
     
        var members = await _Repository.SearchAsync(
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

        return members;
    }
}