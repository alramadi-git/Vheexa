namespace Database.Permissions.Partner;


public abstract class AbstractPartnerPermission : AbstractPermission<AbstractPartnerPermission.PERMISSION>
{
    private static Dictionary<PERMISSION, string> _Permissions { get; } = new Dictionary<PERMISSION, string>() {
        { PERMISSION.PROFILE_CREATE, "partner.profile.create" },
        { PERMISSION.PROFILE_READ, "partner.profile.read" },
        { PERMISSION.PROFILE_UPDATE, "partner.profile.update" },
        { PERMISSION.PROFILE_DELETE, "partner.profile.delete" },
        { PERMISSION.MEMBER_CREATE, "partner.member.create" },
        { PERMISSION.MEMBER_READ, "partner.member.read" },
        { PERMISSION.MEMBER_UPDATE, "partner.member.update" },
        { PERMISSION.MEMBER_DELETE, "partner.member.delete" },
        { PERMISSION.VEHICLE_CREATE, "partner.vehicle.create" },
        { PERMISSION.VEHICLE_READ, "partner.vehicle.read" },
        { PERMISSION.VEHICLE_UPDATE, "partner.vehicle.update" },
        { PERMISSION.VEHICLE_DELETE, "partner.vehicle.delete" },
    };
    protected override string _Permission(PERMISSION permission) => _Permissions[permission];

    public enum PERMISSION
    {
        PROFILE_CREATE,
        PROFILE_READ,
        PROFILE_UPDATE,
        PROFILE_DELETE,
        MEMBER_CREATE,
        MEMBER_READ,
        MEMBER_UPDATE,
        MEMBER_DELETE,
        VEHICLE_CREATE,
        VEHICLE_READ,
        VEHICLE_UPDATE,
        VEHICLE_DELETE,
    }

    public abstract bool Ensure();
}