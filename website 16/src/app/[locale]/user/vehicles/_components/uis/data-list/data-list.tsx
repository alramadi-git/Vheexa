import { VehicleService } from "@/services/vehicle/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

export default async function DataList() {
  const response = await VehicleService.GetMany();

  return (
    <Section>
      <Container className="space-y-8">
        <Filters />
      </Container>
    </Section>
  );
}
