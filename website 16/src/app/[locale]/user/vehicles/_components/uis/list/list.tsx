import { tVehicle } from "@/app/[locale]/user/_types/vehicle";
import { VehicleService } from "@/app/[locale]/user/_services/vehicle/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

import ListLocal from "@/components/locals/blocks/list";
import Item from "./item";

export default async function List() {
  const response = await VehicleService.GetMany();
  if ("code" in response) return;

  return (
    <Section>
      <Container className="flex items-start gap-4">
        <Filters />
        <ListLocal<tVehicle>
          items={response.data}
          render={(item) => <Item key={item.uuid} vehicle={item} />}
          className="grid w-full grid-cols-3 gap-6"
        />
      </Container>
    </Section>
  );
}
