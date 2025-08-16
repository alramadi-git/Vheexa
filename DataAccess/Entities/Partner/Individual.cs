namespace DataAccess.Entities;

public class Individual
{
    public uint ID;

    public Partner? Partner;
    public required uint PartnerID;

    public Human? Human;
    public required uint HumanID;
}