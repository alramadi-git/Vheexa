using Database.DTOs;

namespace Database.Repositories.Partner;

public class RoleRepository
{
    private readonly AppDBContext _AppDBContext;

    public RoleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    // public async Task<SuccessOneDTO<RoleDTO>> GetOneAsync(Guid roleUUID)
    // {
    //     var roleQuery = _AppDBContext.Roles.AsQueryable();
    //     roleQuery = roleQuery.Where(role => role.UUID == roleUUID);
    //     roleQuery = roleQuery.Where(role => role.IsDeleted == false);

    //     var role = await roleQuery.AsNoTracking().FirstOrDefaultAsync()
    //     ?? throw new ExceptionDTO(HTTP_STATUS_CODE.NOT_FOUND, "No such role.");

    //     return new SuccessOneDTO<RoleDTO>(new RoleDTO(role));
    // }
};