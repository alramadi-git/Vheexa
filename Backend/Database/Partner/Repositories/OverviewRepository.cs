using System.Collections.Immutable;
using Database.Enums;
using Database.Partner.Contexts;

using Database.Partner.Dtos;
using Microsoft.EntityFrameworkCore;

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
        var roles = _AppDBContext.PartnerRoles
        .Where(
            partnerRole => partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        );
        var branches = _AppDBContext.Branches
        .Where(
            branch => branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        );
        var members = _AppDBContext.Members
        .Where(
            member => member.PartnerUuid == memberContext.PartnerUuid &&
            !member.IsDeleted
        );
        var vehicleModels = _AppDBContext.VehicleModels
        .Where(
            vehicleModel => vehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !vehicleModel.IsDeleted
        );

        var activeRolesCount = await roles
        .Where(partnerRole => partnerRole.Status == STATUS.ACTIVE)
        .CountAsync();
        var inactiveRolesCount = await roles
        .Where(partnerRole => partnerRole.Status == STATUS.ACTIVE)
        .CountAsync();

        var activeBranchesCount = await branches
       .Where(branch => branch.Status == STATUS.ACTIVE)
       .CountAsync();
        var inactiveBranchesCount = await branches
        .Where(branch => branch.Status == STATUS.ACTIVE)
        .CountAsync();

        var activeMembersCount = await members
       .Where(member => member.Status == STATUS.ACTIVE)
       .CountAsync();
        var inactiveMembersCount = await members
        .Where(member => member.Status == STATUS.ACTIVE)
        .CountAsync();

        var activeVehicleModelsCount = await vehicleModels
       .Where(vehicleModel => vehicleModel.Status == STATUS.ACTIVE)
       .CountAsync();
        var inactiveVehicleModelsCount = await vehicleModels
        .Where(vehicleModel => vehicleModel.Status == STATUS.ACTIVE)
        .CountAsync();

        var permissionsByRole = await _AppDBContext.PartnerRoles
        .Where(
            partnerRole => partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(partnerRole => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
        {
            GroupName = partnerRole.Role.Name,
            Count = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == partnerRole.RoleUuid)
            .Count()
        })
        .ToArrayAsync();

        var membersByRole = await _AppDBContext.PartnerRoles
        .Where(
            partnerRole => partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(partnerRole => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
        {
            GroupName = partnerRole.Role.Name,
            Count = _AppDBContext.Members
            .Where(member => member.RoleUuid == partnerRole.RoleUuid)
            .Count()
        })
        .ToArrayAsync();

        var membersByBranch = await _AppDBContext.Branches
       .Where(
           branch => branch.PartnerUuid == memberContext.PartnerUuid &&
           !branch.IsDeleted
       )
       .Select(branch => new ClsOverviewDto.ClsEntitiesCountDto.ClsEntityCountDto
       {
           GroupName = branch.Name,
           Count = _AppDBContext.Members
           .Where(member => member.BranchUuid == branch.Uuid)
           .Count()
       })
       .ToArrayAsync();


        var vehicleModelPrices = await _AppDBContext.VehicleModels
        .Where(
            vehicleModel => vehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !vehicleModel.IsDeleted
        )
        .Select(vehicleModel => vehicleModel.Price)
        .Order()
        .ToArrayAsync();

        var vehicleModelMinPrice = vehicleModelPrices.DefaultIfEmpty(0).Min();
        var vehicleModelMaxPrice = vehicleModelPrices.DefaultIfEmpty(0).Max();
        var vehicleModelAveragePrice = vehicleModelPrices.DefaultIfEmpty(0).Average();

        var uniqueVehicleModelPrices = vehicleModelPrices.ToHashSet().Order().ToArray();
        var chunks = (int)Math.Ceiling(uniqueVehicleModelPrices.Length / 3F);

        var ranges = new List<ClsOverviewDto.ClsPriceDistributionDto.ClsRangeDto>(chunks);
        var visitedChunks = 0;
        while (visitedChunks < chunks)
        {
            decimal from = 0, to = 0;
            for (int i = visitedChunks * 3, iter = 1; i < chunks || iter <= 3; i++, iter++)
            {
                var price = uniqueVehicleModelPrices[i];
                from = from < price ? from : price;
                to = to > price ? to : price;
            }

            ranges.Add(new ClsOverviewDto.ClsPriceDistributionDto.ClsRangeDto
            {
                From = from,
                To = to,
                Count = 0
            });

            visitedChunks++;
        }

        //TODO: do the count logic to the ranges[i].count

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