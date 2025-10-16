"use client";
import { tVehicle } from "@/app/api/user/_types/vehicle";
import { VehicleService } from "@/app/[locale]/user/_services/vehicle/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

import { List as ListBlock } from "@/components/locals/blocks/list";
import Item from "./item";

export default function List() {
  const response = VehicleService.GetMany();
  if ("code" in response) return null;

  return (
    <Section>
      <Container className="flex items-start gap-4">
        <Filters />
        <ListBlock<tVehicle>
          items={response.data}
          render={(item) => <Item key={item.uuid} vehicle={item} />}
          className="grid w-full grid-cols-3 gap-6"
        />
      </Container>
    </Section>
  );
}
