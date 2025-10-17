"use client";

import { tVehicle } from "@/app/api/user/_types/vehicle";
import { useVehiclesQuery } from "../../../_hooks/use-vehicles-query";

import { Fragment } from "react";

import { Section, Container } from "@/components/locals/blocks/typography";
import Filters from "./filters";

import {
  List as ListBlock,
  ListSkeleton,
} from "@/components/locals/blocks/list";
import Item from "./item";

export default function List() {
  const { isLoading, result } = useVehiclesQuery();
  console.log(result);

  return (
    <Section>
      <Container className="flex items-start gap-4">
        <Filters />
        {isLoading ? (
          <ListSkeleton
            length={8}
            render={(index) => <Fragment key={index} />}
          />
        ) : (
          <ListBlock<tVehicle>
            items={result?.data ?? []}
            render={(item) => <Item key={item.uuid} vehicle={item} />}
            className="grid w-full grid-cols-3 gap-6"
          />
        )}
      </Container>
    </Section>
  );
}
