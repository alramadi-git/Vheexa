using Database.Partner.Repositories;

using Business.Partner.Validations.Guards;

using Database.Partner.Contexts;

using Business.Inputs;
using Business.Partner.Inputs;

using Database.Dtos;
using Database.Partner.Dtos;

namespace Business.Partner.Services;

public class ClsVehicleModelService
{
    private readonly ClsVehicleModelRepository _Repository;
    private readonly ClsVehicleModelGuard _Guard;


    public ClsVehicleModelService(ClsVehicleModelRepository repository, ClsVehicleModelGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task CreateOneAsync(ClsVehicleModelCreateInput vehicleModel, ClsMemberContext memberContext)
    {
        // TODO: make the ImageKit integration and replace the "url" with a real one 
        await _Guard.CreateOneAsync(vehicleModel);
        await _Repository.CreateOneAsync(
            new Database.Partner.Inputs.ClsVehicleModelCreateInput
            {
                Thumbnail = "url",
                Gallery = [],
                Name = vehicleModel.Name,
                Description = vehicleModel.Description,
                Category = vehicleModel.Category,
                Manufacturer = vehicleModel.Manufacturer,
                MarketLaunch = vehicleModel.MarketLaunch,
                Capacity = vehicleModel.Capacity,
                Transmission = vehicleModel.Transmission,
                Fuel = vehicleModel.Fuel,
                Price = vehicleModel.Price,
                Discount = vehicleModel.Discount,
                Tags = vehicleModel.Tags,
                Status = vehicleModel.Status
            },
            memberContext
        );
    }
    public async Task<ClsVehicleModelDto> ReadOneAsync(Guid vehicleModelUuid, ClsMemberContext memberContext)
    {
        return await _Repository.ReadOneAsync(vehicleModelUuid, memberContext);
    }
    public async Task DeleteOneAsync(Guid vehicleModelUuid, ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(vehicleModelUuid, memberContext);
    }
    public async Task<ClsPaginatedDto<ClsVehicleModelDto>> SearchAsync(ClsVehicleModelFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        return await _Repository.SearchAsync(
            new Database.Partner.Inputs.ClsVehicleModelFilterInput
            {
                Search = filter.Search,
                Categories = filter.Categories,
                Capacity = new Database.Partner.Inputs.ClsVehicleModelFilterInput.ClsMinMaxInput
                {
                    Min = filter.Capacity.Min,
                    Max = filter.Capacity.Max
                },
                Price = new Database.Partner.Inputs.ClsVehicleModelFilterInput.ClsMinMaxMoneyInput
                {
                    Min = filter.Price.Min,
                    Max = filter.Price.Max
                },
                Discount = new Database.Partner.Inputs.ClsVehicleModelFilterInput.ClsMinMaxMoneyInput
                {
                    Min = filter.Discount.Min,
                    Max = filter.Discount.Max
                },
                Status = filter.Status
            },
            new Database.Inputs.ClsPaginationInput
            {
                Page = pagination.Page,
                PageSize = (int)pagination.PageSize
            },
            memberContext
        );
    }
}