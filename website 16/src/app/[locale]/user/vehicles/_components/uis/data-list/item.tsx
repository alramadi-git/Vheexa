import * as Serialization from "class-transformer";

import { Vehicle } from "@/classes/vehicle";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/shadcn/card";

export default function Item(props: unknown) {
  const vehicle = Serialization.plainToInstance(Vehicle, props);

  return (
    <Card className="pt-0">
      <CardHeader className="relative">
        
      </CardHeader>
      <CardContent>
        <CardTitle>{vehicle.Name}</CardTitle>
        <CardDescription>{vehicle.Description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
