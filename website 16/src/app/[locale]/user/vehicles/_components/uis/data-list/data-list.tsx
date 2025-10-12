"use client";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

export default function DataList() {
  // const result = VehicleService.GetMany(
  //   new VehicleFiltrationQuery(new PaginationQuery(1)),
  // );

  return (
    <Section>
      <Container className="space-y-8">
        <Filters />
      </Container>
    </Section>
  );
}
