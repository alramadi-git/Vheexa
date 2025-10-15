import { tVehicle } from "@/services/user/types/vehicle";
import { VehicleService } from "@/services/user/vehicle/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";
import List from "@/components/locals/blocks/list";
import Item from "./item";

export default async function DataList() {
  const response = await VehicleService.GetMany();
  if ("code" in response) return;

  return (
    <Section>
      <Container className="flex items-start gap-4">
        <Filters />
        <List<tVehicle>
          items={response.data}
          render={(item) => <Item key={item.uuid} vehicle={item} />}
          className="grid w-full grid-cols-3 gap-6"
        />
      </Container>
    </Section>
  );
}
