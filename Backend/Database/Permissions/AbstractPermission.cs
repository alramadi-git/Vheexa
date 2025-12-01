using Database.DTOs;

namespace Database.Permissions;

public abstract class AbstractPermission<TPermissionEnum> : IPermission
where TPermissionEnum : Enum
{
    protected abstract string _Permission(TPermissionEnum permission);

    protected void _UnauthorizedAccessException()
    {
        throw new ExceptionDTO(HTTP_STATUS_CODE.UNAUTHORIZED, "You're not allowed to do this.");
    }
};