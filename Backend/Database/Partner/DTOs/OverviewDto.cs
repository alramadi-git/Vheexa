namespace Database.Partner.Dtos;

public class ClsOverviewDto
{
    public class ClsEntityOverviewsDto
    {
        public class ClsEntityOverviewDto
        {
            public int Active { get; set; }
            public int Inactive { get; set; }
            public int Total { get; set; }
        }
        public ClsEntityOverviewDto Roles { get; set; }
        public ClsEntityOverviewDto Branches { get; set; }
        public ClsEntityOverviewDto Members { get; set; }
        public ClsEntityOverviewDto VehicleModels { get; set; }
    }
    public class ClsEntitiesCountDto
    {
        public class ClsEntityCountDto
        {
            public string GroupName { get; set; }
            public int Count { get; set; }
        }
        public ClsEntityCountDto[] PermissionsByRole { get; set; }
        public ClsEntityCountDto[] MembersByRole { get; set; }
        public ClsEntityCountDto[] MembersByBranch { get; set; }
    }
    public class ClsPriceDistributionDto
    {
        public class ClsRangeDto
        {
            public decimal From { get; set; }
            public decimal To { get; set; }
            public int Count { get; set; }
        }
        public decimal Min { get; set; }
        public decimal Max { get; set; }
        public decimal Average { get; set; }
        public ClsRangeDto[] Ranges { get; set; }
    }
    public ClsEntityOverviewsDto EntityOverviews { get; set; }
    public ClsEntitiesCountDto GroupedCounts { get; set; }
    public ClsPriceDistributionDto VehicleModelPriceDistribution { get; set; }

}