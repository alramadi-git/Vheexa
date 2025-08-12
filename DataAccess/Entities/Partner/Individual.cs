namespace DataAccess.Entities;

public class Individual
{
    public required int ID;

    public Partner? Partner;
    public required int PartnerID;

    public Human? Human;
    public required int HumanID;
}