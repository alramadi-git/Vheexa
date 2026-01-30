using Microsoft.EntityFrameworkCore;

using Database.Partner.Contexts;

using Database.Enums;

using Database.Partner.Dtos;

namespace Database.Partner.Repositories;

public class ClsOverviewRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsOverviewRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsOverviewDto> ReadOneAsync(ClsMemberContext memberContext)
    {
        var partnerRolesQuery = _AppDBContext.PartnerRoles
        .AsNoTracking()
        .Where(
            partnerRole => partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        );
        var branchesQuery = _AppDBContext.Branches
        .AsNoTracking()
        .Where(
            branch => branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        );
        var membersQuery = _AppDBContext.Members
        .AsNoTracking()
        .Where(
            member => member.PartnerUuid == memberContext.PartnerUuid &&
            !member.IsDeleted
        );
        var vehicleModelsQuery = _AppDBContext.VehicleModels
        .AsNoTracking()
        .Where(
            vehicleModel => vehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !vehicleModel.IsDeleted
        );

        var partnerRolesStatus = await partnerRolesQuery.Select(partnerRole => partnerRole.Status).ToArrayAsync();
        var activeRolesCount = partnerRolesStatus.Count(partnerRoleStatus => partnerRoleStatus == STATUS.ACTIVE);
        var inactiveRolesCount = partnerRolesStatus.Count(partnerRoleStatus => partnerRoleStatus == STATUS.INACTIVE);

        var branchesStatus = await branchesQuery.Select(branch => branch.Status).ToArrayAsync();
        var activeBranchesCount = branchesStatus.Count(branchStatus => branchStatus == STATUS.ACTIVE);
        var inactiveBranchesCount = branchesStatus.Count(branchStatus => branchStatus == STATUS.INACTIVE);


        var membersStatus = await membersQuery.Select(member => member.Status).ToArrayAsync();
        var activeMembersCount = membersStatus.Count(memberStatus => memberStatus == STATUS.ACTIVE);
        var inactiveMembersCount = membersStatus.Count(memberStatus => memberStatus == STATUS.INACTIVE);

        var vehicleModelsStatus = await vehicleModelsQuery.Select(vehicleModel => vehicleModel.Status).ToArrayAsync();
        var activeVehicleModelsCount = vehicleModelsStatus.Count(vehicleModelStatus => vehicleModelStatus == STATUS.ACTIVE);
        var inactiveVehicleModelsCount = vehicleModelsStatus.Count(vehicleModelStatus => vehicleModelStatus == STATUS.INACTIVE);

        var permissionsByRole = await partnerRolesQuery
        .Select(partnerRole => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
        {
            GroupName = partnerRole.Role.Name,
            Count = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == partnerRole.RoleUuid)
            .Count()
        })
        .ToArrayAsync();

        var membersByRole = await partnerRolesQuery
        .Select(partnerRole => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
        {
            GroupName = partnerRole.Role.Name,
            Count = membersQuery
            .Where(member => member.RoleUuid == partnerRole.RoleUuid)
            .Count()
        })
        .ToArrayAsync();

        var membersByBranch = await branchesQuery
       .Select(branch => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
       {
           GroupName = branch.Name,
           Count = membersQuery
           .Where(member => member.BranchUuid == branch.Uuid)
           .Count()
       })
       .ToArrayAsync();


        var vehicleModelPrices = await vehicleModelsQuery
        .Select(vehicleModel => vehicleModel.Price)
        .Order()
        .ToArrayAsync();

        var vehicleModelMinPrice = vehicleModelPrices.Length > 0 ? vehicleModelPrices[0] : 0;
        var vehicleModelMaxPrice = vehicleModelPrices.Length > 0 ? vehicleModelPrices[^1] : 0;
        var vehicleModelAveragePrice = vehicleModelPrices.DefaultIfEmpty(0).Average();

        var uniqueVehicleModelPrices = vehicleModelPrices.Distinct().Order().ToArray();
        var chunks = (int)Math.Ceiling(uniqueVehicleModelPrices.Length / 3F);

        var ranges = new List<ClsOverviewDto.ClsPriceDistributionDto.ClsRangeDto>(chunks);
        for (var i = 0; i < chunks; i++)
        {
            decimal
            from = uniqueVehicleModelPrices[i * 3],
            to = uniqueVehicleModelPrices[Math.Min(i * 3 + 2, uniqueVehicleModelPrices.Length - 1)];

            ranges.Add(new ClsOverviewDto.ClsPriceDistributionDto.ClsRangeDto
            {
                From = from,
                To = to,
                Count = 0
            });
        }

        foreach (var range in ranges)
        {
            range.Count = vehicleModelPrices
            .Count(
                vehicleModelPrice =>
                vehicleModelPrice >= range.From &&
                vehicleModelPrice <= range.To
            );
        }

        return new ClsOverviewDto
        {
            EntityOverviews = new ClsOverviewDto.ClsEntityOverviewsDto
            {
                Roles = new ClsOverviewDto.ClsEntityOverviewsDto.ClsEntityOverviewDto
                {
                    Active = activeRolesCount,
                    Inactive = inactiveRolesCount,
                    Total = activeRolesCount + inactiveRolesCount
                },
                Branches = new ClsOverviewDto.ClsEntityOverviewsDto.ClsEntityOverviewDto
                {
                    Active = activeBranchesCount,
                    Inactive = inactiveBranchesCount,
                    Total = activeBranchesCount + inactiveBranchesCount
                },
                Members = new ClsOverviewDto.ClsEntityOverviewsDto.ClsEntityOverviewDto
                {
                    Active = activeMembersCount,
                    Inactive = inactiveMembersCount,
                    Total = activeMembersCount + inactiveMembersCount
                },
                VehicleModels = new ClsOverviewDto.ClsEntityOverviewsDto.ClsEntityOverviewDto
                {
                    Active = activeVehicleModelsCount,
                    Inactive = inactiveVehicleModelsCount,
                    Total = activeVehicleModelsCount + inactiveVehicleModelsCount
                }
            },
            GroupedCounts = new ClsOverviewDto.ClsEntitiesCountDto
            {
                PermissionsByRole = permissionsByRole,
                MembersByBranch = membersByBranch,
                MembersByRole = membersByRole
            },
            VehicleModelPriceDistribution = new ClsOverviewDto.ClsPriceDistributionDto
            {
                Min = vehicleModelMinPrice,
                Max = vehicleModelMaxPrice,
                Average = vehicleModelAveragePrice,
                Ranges = ranges.ToArray()
            }
        };
    }
};