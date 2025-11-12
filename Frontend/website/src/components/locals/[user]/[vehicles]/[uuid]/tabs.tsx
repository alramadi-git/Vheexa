import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { tVehicleModel } from "@/models/[user]/vehicle";
import { getTranslations } from "next-intl/server";
import { LuFuel, LuUsersRound } from "react-icons/lu";
import { RiSteeringFill } from "react-icons/ri";

type tTabsProps = {
  vehicleModel: tVehicleModel;
};
export default async function Tabs({ vehicleModel }: tTabsProps) {
  const t = await getTranslations("app.user.vehicles.uuid.page.product.tabs");
  return (
    <ShadcnTabs
      defaultValue={t("specifications.label")}
      className="mt-6 grow gap-3"
    >
      <TabsList>
        <TabsTrigger value={t("specifications.label")}>
          {t("specifications.label")}
        </TabsTrigger>
        <TabsTrigger value={t("comments-and-reviews.label")}>
          {t("comments-and-reviews.label")}
        </TabsTrigger>
      </TabsList>

      <Specifications vehicleModel={vehicleModel} />
      <CommentsAndReviews />
    </ShadcnTabs>
  );
}

type tSpecificationProps = {
  vehicleModel: tVehicleModel;
};
async function Specifications({ vehicleModel }: tSpecificationProps) {
  const t = await getTranslations(
    "app.user.vehicles.uuid.page.product.tabs.specifications",
  );

  return (
    <TabsContent value={t("label")} className="grid grid-cols-2 gap-3">
      <Card>
        <CardContent className="m-auto">
          <div className="flex items-center gap-1">
            <RiSteeringFill size={32} />
            <CardTitle className="text-xl font-medium">
              {t("content.transmission")}
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            {vehicleModel.transmission}
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="m-auto">
          <div className="flex items-center gap-1">
            <LuFuel size={32} />
            <CardTitle className="text-xl font-medium">
              {t("content.fuel")}
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            {vehicleModel.fuel}
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="m-auto">
          <div className="flex items-center gap-1">
            <LuUsersRound size={32} />
            <CardTitle className="text-xl font-medium">
              {t("content.capacity.label")}
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            {t("content.capacity.value", { value: vehicleModel.capacity })}
          </CardDescription>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

async function CommentsAndReviews() {
  const t = await getTranslations(
    "app.user.vehicles.uuid.page.product.tabs.comments-and-reviews",
  );

  return (
    <TabsContent value={t("label")} className="flex size-full">
      <p className="m-auto text-2xl font-bold">{t("content")}</p>
    </TabsContent>
  );
}
