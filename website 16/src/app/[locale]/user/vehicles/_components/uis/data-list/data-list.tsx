import { VehicleFiltration, VehicleService } from "@/services/vehicle/vehicle";
import * as Serialization from "class-transformer";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filtration from "@/app/[locale]/user/vehicles/_components/uis/data-list/filtration";
import { PaginationQuery } from "@/services/classes/filtration";
import { Vehicle } from "@/classes/vehicle";
// import List from "@/components/locals/blocks/list";
// import Item from "@/app/[locale]/user/vehicles/_components/uis/data-list/item";
// import Pagination from "@/components/locals/uis/pagination";

export default function DataList() {
  const result = VehicleService.GetMany(
    new VehicleFiltration(new PaginationQuery(1)),
  );

  console.log(result.Data[0]);
  console.log(Serialization.plainToInstance(Vehicle, result.Data[0]));

  return (
    <Section>
      <Container>
        <Filtration />

        {/* <List items={result.Data} render={(item) => <Item key={item.ID} />} /> */}
        {/* <Pagination /> */}
      </Container>
    </Section>
  );
}
