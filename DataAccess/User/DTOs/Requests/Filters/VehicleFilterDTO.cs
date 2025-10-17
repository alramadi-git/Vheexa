using DataAccess.Entities;
namespace DataAccess.User.DTOs.Requests.Filters;

public class SearchFilterDTO : AbstractFilterDTO<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities
        .Where(ent =>
            ent.Name.ToLower().Contains(Value.ToLower())
            || ent.Description.ToLower().Contains(Value.ToLower())
            || ent.Tags.Any(tag => tag.ToLower().Contains(Value.ToLower()))
        );
    }
}

public class TransmissionFilterDTO : AbstractFilterDTO<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Transmission.ToLower().Contains(Value.ToLower()));
    }
}
public class FuelFilterDTO : AbstractFilterDTO<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Fuel.ToLower().Contains(Value.ToLower()));
    }
}

public class MinCapacityFilterDTO : AbstractFilterDTO<short, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Capacity >= Value);
    }
}
public class MaxCapacityFilterDTO : AbstractFilterDTO<short, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Capacity <= Value);
    }
}


public class MinPriceFilterDTO : AbstractFilterDTO<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Price >= Value);
    }
}
public class MaxPriceFilterDTO : AbstractFilterDTO<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Price <= Value);
    }
}

public class HasDiscountFilterDTO : AbstractFilterDTO<bool, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == true) return entities.Where(ent => ent.Discount > 0);
        return entities;
    }
}


public class VehicleFiltersDTO
{
    public SearchFilterDTO? Search { get; set; }

    public TransmissionFilterDTO? Transmission { get; set; }
    public FuelFilterDTO? Fuel { get; set; }

    public MinCapacityFilterDTO? MinCapacity { get; set; }
    public MaxCapacityFilterDTO? MaxCapacity { get; set; }

    public MinPriceFilterDTO? MinPrice { get; set; }
    public MaxPriceFilterDTO? MaxPrice { get; set; }

    public HasDiscountFilterDTO? HasDiscount { get; set; }

    public IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        var filters = entities;

        if (Search != null) filters = Search.Apply(filters);

        if (Transmission != null) filters = Transmission.Apply(filters);

        if (MinCapacity != null) filters = MinCapacity.Apply(filters);
        if (MaxCapacity != null) filters = MaxCapacity.Apply(filters);

        if (Fuel != null) filters = Fuel.Apply(filters);

        if (MinPrice != null) filters = MinPrice.Apply(filters);
        if (MaxPrice != null) filters = MaxPrice.Apply(filters);

        if (HasDiscount != null) filters = HasDiscount.Apply(filters);

        return filters;
    }
};