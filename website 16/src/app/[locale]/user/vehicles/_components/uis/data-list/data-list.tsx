import { VehicleService } from "@/services/vehicle";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filtration from "@/app/[locale]/user/vehicles/_components/uis/data-list/filtration";
import List from "@/components/locals/blocks/list";
import Item from "@/app/[locale]/user/vehicles/_components/uis/data-list/item";
// import Pagination from "@/components/locals/uis/pagination";

export default function DataList() {
  const result = VehicleService.GetAll();

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
