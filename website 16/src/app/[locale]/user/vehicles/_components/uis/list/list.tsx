"use client";

import { tVehicle } from "@/app/api/user/_types/vehicle";
import { useVehiclesQuery } from "../../../_hooks/use-vehicles-query";

import { Fragment } from "react";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

import { List as ListBlock } from "@/components/locals/blocks/list";
import Item from "./item";

export default function List() {
  const { isLoading, result } = useVehiclesQuery();

  return (
    <Section>
      <Container className="flex items-start gap-4">
        <Filters />
        <ListBlock<tVehicle>
          isLoading={isLoading}
          items={result?.data ?? []}
          render={(item) => <Item key={item.uuid} vehicle={item} />}
          whenLoading={{
            length: 10,
            render: (_, index) => <Fragment key={index} />,
          }}
          className="grid w-full grid-cols-3 gap-6"
        />
      </Container>
    </Section>
  );
}
