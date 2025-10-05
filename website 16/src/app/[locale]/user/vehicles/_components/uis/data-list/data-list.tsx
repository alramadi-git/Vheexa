import {
  VehicleFiltrationQuery,
  VehicleService,
} from "@/services/vehicle/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filtration from "@/app/[locale]/user/vehicles/_components/uis/data-list/filtration";
import { PaginationQuery } from "@/services/classes/filtration";
import List from "@/components/locals/blocks/list";
import Item from "@/app/[locale]/user/vehicles/_components/uis/data-list/item";
// import Pagination from "@/components/locals/uis/pagination";

export default function DataList() {
  const result = VehicleService.GetMany(
    new VehicleFiltrationQuery(new PaginationQuery(1)),
  );

  return (
    <Section>
      <Container className="space-y-8">
        <Filtration />

        <List
          items={result.Data}
          render={(item) => <Item key={item.ID} {...item} />}
          className="grid grid-cols-3 gap-8"
        />
        {/* <Pagination /> */}
      </Container>
    </Section>
  );
}
