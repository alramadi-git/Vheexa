namespace Database.Partner.Models;

public class ClsOverviewModel
{
    public class ClsEntityOverviewsModel
    {
        public class ClsEntityOverviewModel
        {
            public int Active { get; set; }
            public int Inactive { get; set; }
            public int Total { get; set; }
        }
        public ClsEntityOverviewModel Roles { get; set; }
        public ClsEntityOverviewModel Branches { get; set; }
        public ClsEntityOverviewModel Members { get; set; }
        public ClsEntityOverviewModel VehicleModels { get; set; }
    }
    public class ClsEntitiesCountModel
    {
        public class ClsEntityCountModel
        {
            public string GroupName { get; set; }
            public int Count { get; set; }
        }
        public ClsEntityCountModel[] PermissionsByRole { get; set; }
        public ClsEntityCountModel[] MembersByRole { get; set; }
        public ClsEntityCountModel[] MembersByBranch { get; set; }
    }
    public class ClsPriceDistributionModel
    {
        public class ClsRangeModel
        {
            public decimal From { get; set; }
            public decimal To { get; set; }
            public int Count { get; set; }
        }
        public decimal Min { get; set; }
        public decimal Max { get; set; }
        public decimal Average { get; set; }
        public ClsRangeModel[] Ranges { get; set; }
    }
    public ClsEntityOverviewsModel EntityOverviews { get; set; }
    public ClsEntitiesCountModel GroupedCounts { get; set; }
    public ClsPriceDistributionModel VehicleModelPriceDistribution { get; set; }
}