"use client";

import { Card } from "@/components/shadcn/card";

// import PaginationFilter from "@/components/locals/blocks/pagination";
import Form from "./form";

export default function Filtration() {
  return (
    <Card className="relative min-h-full w-1/4 rounded-md">
      <Form />
    </Card>
  );
}
