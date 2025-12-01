namespace Database.Permissions.Partner;

public class PartnerVehiclePermission : AbstractPartnerPermission
{
    public override bool Ensure()
    {
        _Permission(PERMISSION.MEMBER_CREATE);
        return true;
    }
}