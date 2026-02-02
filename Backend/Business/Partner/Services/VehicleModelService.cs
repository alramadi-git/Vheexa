using Business.Integrations;

using Business.Partner.Validations.Guards;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Services;

public class ClsVehicleModelService
{
    private readonly Database.Partner.Repositories.ClsVehicleModelRepository _Repository;
    private readonly ClsVehicleModelGuard _Guard;

    private readonly ClsImagekitIntegration _ImagekitIntegration;

    public ClsVehicleModelService(Database.Partner.Repositories.ClsVehicleModelRepository repository, ClsVehicleModelGuard guard, ClsImagekitIntegration imagekitIntegration)
    {
        _Repository = repository;
        _Guard = guard;

        _ImagekitIntegration = imagekitIntegration;
    }

    public async Task CreateOneAsync(ClsVehicleModelCreateInput vehicleModel, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        var VehicleModelUuid = Guid.NewGuid();

        string? uploadedThumbnailId = null;

        try
        {
            await _Guard.CreateOneAsync(vehicleModel);

            var thumbnailTask = vehicleModel.Thumbnail == null ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null) : _ImagekitIntegration.UploadOneAsyncSafe(vehicleModel.Thumbnail, $"/partners/{memberContext.PartnerUuid}/vehicle-models/{VehicleModelUuid}");
            var galleryTask = _ImagekitIntegration.UploadManyAsyncSafe(vehicleModel.Gallery, $"/partners/{memberContext.PartnerUuid}/vehicle-models/{VehicleModelUuid}/gallery");

            await Task.WhenAll(thumbnailTask, galleryTask);

            var thumbnail = thumbnailTask.Result;
            var gallery = galleryTask.Result;

            uploadedThumbnailId = thumbnail?.Id;

            await _Repository.CreateOneAsync(
                new Database.Partner.Inputs.ClsVehicleModelCreateInput
                {
                    Uuid = VehicleModelUuid,
                    Thumbnail = thumbnail == null ? null : new Database.Inputs.ClsImageInput
                    {
                        Id = thumbnail.Id,
                        Url = thumbnail.Url
                    },
                    Gallery = gallery.Select(image => new Database.Inputs.ClsImageInput
                    {
                        Id = image.Id,
                        Url = image.Url
                    }).ToArray(),
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
        catch
        {
            await Task.WhenAll([
                uploadedThumbnailId == null ? Task.CompletedTask :_ImagekitIntegration.DeleteImageAsync(uploadedThumbnailId),
                _ImagekitIntegration.DeleteFolderAsync($"/partners/{memberContext.PartnerUuid}/vehicle-models/{VehicleModelUuid}/gallery"),
            ]);

            throw;
        }
    }
    public async Task DeleteOneAsync(Guid vehicleModelUuid, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Repository.DeleteOneAsync(vehicleModelUuid, memberContext);
        await _ImagekitIntegration.DeleteFolderAsync($"/partners/{memberContext.PartnerUuid}/vehicle-models/{vehicleModelUuid}");

    }
    public async Task<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsVehicleModelModel>> SearchAsync(ClsVehicleModelFilterInput filter, ClsPaginationInput pagination, Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        await _Guard.SearchAsync(filter, pagination);
        var vehicleModels = await _Repository.SearchAsync(
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

        return vehicleModels;
    }
}