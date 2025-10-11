"use client";

import {
  VehicleService,
  VehicleFiltrationQuery,
} from "@/services/vehicle/vehicle";
import { PaginationQuery } from "@/services/queries/filter";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filtration from "@/app/[locale]/user/vehicles/_components/uis/data-list/filtration";
import List from "@/components/locals/blocks/list";
import Item from "@/app/[locale]/user/vehicles/_components/uis/data-list/item";

export default function DataList() {
  const result = VehicleService.GetMany(
    new VehicleFiltrationQuery(new PaginationQuery(1)),
  );

  return (
    <Section>
      <Container className="space-y-8">
        <Filtration
          list={
            <List
              items={result.Data}
              render={(item) => <Item key={item.ID} data={item} />}
              className="grid grid-cols-3 gap-3.5"
            />
          }
          pagination={result.Pagination}
        />
      </Container>
    </Section>
  );
}
