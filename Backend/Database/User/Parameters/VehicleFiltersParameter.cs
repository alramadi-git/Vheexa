using Database.Entities;
using Database.Parameters;

namespace Database.User.Parameters;

public class SearchFilterDTO : AbstractFilterParameter<string, VehicleEntity>
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

public class TransmissionFilterDTO : AbstractFilterParameter<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Transmission.ToLower().Contains(Value.ToLower()));
    }
}
public class FuelFilterDTO : AbstractFilterParameter<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Fuel.ToLower().Contains(Value.ToLower()));
    }
}

public class MinCapacityFilterDTO : AbstractFilterParameter<int, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Capacity >= Value);
    }
}
public class MaxCapacityFilterDTO : AbstractFilterParameter<int, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Capacity <= Value);
    }
}


public class MinPriceFilterDTO : AbstractFilterParameter<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Price >= Value);
    }
}
public class MaxPriceFilterDTO : AbstractFilterParameter<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        return entities.Where(ent => ent.Price <= Value);
    }
}

public class HasDiscountFilterDTO : AbstractFilterParameter<bool, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == true) return entities.Where(ent => ent.Discount > 0);
        return entities;
    }
}


public class VehicleFiltersParameter
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