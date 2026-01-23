"use client";

import { useLocale, useTranslations } from "next-intl";

import { eLocale } from "@/i18n/routing";
import { ClsMonyFormatter, eCurrency } from "@/libraries/mony-formatter";

import useOverview from "@/services/partner/overview";
import { useQuery } from "@tanstack/react-query";

import { tOverviewModel } from "@/models/partner/overview";

import {
  LuBuilding2,
  LuCar,
  LuDollarSign,
  LuShield,
  LuUsers,
} from "react-icons/lu";

import { Fragment } from "react";

import { Card, CardContent } from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";

import { Badge, Section } from "@/components/locals/blocks/typography";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/shadcn/progress";

export default function Overview() {
  const overview = useOverview();

  const { isLoading, data: result } = useQuery({
    queryKey: ["overview"],
    queryFn: () => overview.read(),
  });

  return (
    <Section className="size-full space-y-6">
      {isLoading ? (
        "loading..."
      ) : !result?.isSuccess ? (
        "failed..."
      ) : (
        <Fragment>
          <Businesses businesses={result.data.businesses} />
          <Separator />
          <Breakdowns breakdowns={result.data.breakdowns} />
          <Separator />
          <VehicleModelPriceDistribution
            vehicleModelPriceDistribution={
              result.data.vehicleModelPriceDistribution
            }
          />
        </Fragment>
      )}
    </Section>
  );
}

type tBusinessesProps = {
  businesses: tOverviewModel["businesses"];
};
function Businesses({ businesses }: tBusinessesProps) {
  const tBusinesses = useTranslations(
    "app.partner.dashboard.page.overview.businesses",
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      <Card>
        <CardContent>
          <div>
            <h3 className="text-muted-foreground inline-flex items-center gap-1 text-xl">
              <LuShield />
              {tBusinesses("roles")}
            </h3>
            <p className="text-4xl">{businesses.roles.total}</p>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1">
            <Badge variant="success" className="w-full justify-start">
              <div className="relative size-2">
                <div className="absolute top-0 left-0 size-full animate-ping rounded-xs bg-emerald-500" />
                <div className="size-full rounded-xs bg-emerald-500" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("active")}
              </p>
              <p className="ms-auto text-xs">{businesses.roles.active}</p>
            </Badge>
            <Badge variant="muted" className="w-full justify-start">
              <div className="relative size-2">
                <div className="bg-muted-foreground absolute top-0 left-0 size-full animate-ping rounded-xs" />
                <div className="bg-muted-foreground size-full rounded-xs" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("inactive")}
              </p>
              <p className="ms-auto text-xs">{businesses.roles.inactive}</p>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <h3 className="text-muted-foreground inline-flex items-center gap-1 text-xl">
              <LuBuilding2 />
              {tBusinesses("branches")}
            </h3>
            <p className="text-4xl">{businesses.branches.total}</p>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1">
            <Badge variant="success" className="w-full justify-start">
              <div className="relative size-2">
                <div className="absolute top-0 left-0 size-full animate-ping rounded-xs bg-emerald-500" />
                <div className="size-full rounded-xs bg-emerald-500" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("active")}
              </p>
              <p className="ms-auto text-xs">{businesses.branches.active}</p>
            </Badge>
            <Badge variant="muted" className="w-full justify-start">
              <div className="relative size-2">
                <div className="bg-muted-foreground absolute top-0 left-0 size-full animate-ping rounded-xs" />
                <div className="bg-muted-foreground size-full rounded-xs" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("inactive")}
              </p>
              <p className="ms-auto text-xs">{businesses.branches.inactive}</p>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <h3 className="text-muted-foreground inline-flex items-center gap-1 text-xl">
              <LuUsers />
              {tBusinesses("members")}
            </h3>
            <p className="text-4xl">{businesses.members.total}</p>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1">
            <Badge variant="success" className="w-full justify-start">
              <div className="relative size-2">
                <div className="absolute top-0 left-0 size-full animate-ping rounded-xs bg-emerald-500" />
                <div className="size-full rounded-xs bg-emerald-500" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("active")}
              </p>
              <p className="ms-auto text-xs">{businesses.members.active}</p>
            </Badge>
            <Badge variant="muted" className="w-full justify-start">
              <div className="relative size-2">
                <div className="bg-muted-foreground absolute top-0 left-0 size-full animate-ping rounded-xs" />
                <div className="bg-muted-foreground size-full rounded-xs" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("inactive")}
              </p>
              <p className="ms-auto text-xs">{businesses.members.inactive}</p>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <h3 className="text-muted-foreground inline-flex items-center gap-1 text-xl">
              <LuCar />
              {tBusinesses("vehicle-models")}
            </h3>
            <p className="text-4xl">{businesses.vehicleModels.total}</p>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1">
            <Badge variant="success" className="w-full justify-start">
              <div className="relative size-2">
                <div className="absolute top-0 left-0 size-full animate-ping rounded-xs bg-emerald-500" />
                <div className="size-full rounded-xs bg-emerald-500" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("active")}
              </p>
              <p className="ms-auto text-xs">
                {businesses.vehicleModels.active}
              </p>
            </Badge>
            <Badge variant="muted" className="w-full justify-start">
              <div className="relative size-2">
                <div className="bg-muted-foreground absolute top-0 left-0 size-full animate-ping rounded-xs" />
                <div className="bg-muted-foreground size-full rounded-xs" />
              </div>
              <p className="text-muted-foreground text-sm">
                {tBusinesses("inactive")}
              </p>
              <p className="ms-auto text-xs">
                {businesses.vehicleModels.inactive}
              </p>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type tBreakdownsProps = {
  breakdowns: tOverviewModel["breakdowns"];
};
function Breakdowns({ breakdowns }: tBreakdownsProps) {
  const tBreakdowns = useTranslations(
    "app.partner.dashboard.page.overview.breakdowns",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent>
          <div>
            <h3 className="inline-flex items-center gap-1 text-xl">
              <LuShield />
              {tBreakdowns("permissions-by-role.title")}
            </h3>
            <p className="text-muted-foreground">
              {tBreakdowns("permissions-by-role.description")}
            </p>
          </div>
          <Separator className="my-3" />
          <ul className="space-y-1">
            {breakdowns.permissionsByRole.map((role) => (
              <li key={role.name} className="flex items-center justify-between">
                <Badge
                  variant="muted"
                  className="w-full justify-between text-base"
                >
                  <p>{role.name}</p>
                  <p>
                    {tBreakdowns("permissions-by-role.count", {
                      count: role.count,
                    })}
                  </p>
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <h3 className="inline-flex items-center gap-1 text-xl">
              <LuUsers />
              {tBreakdowns("members-by-role.title")}
            </h3>
            <p className="text-muted-foreground">
              {tBreakdowns("members-by-role.description")}
            </p>
          </div>
          <Separator className="my-3" />
          <ul className="space-y-1">
            {breakdowns.membersByRole.map((role) => (
              <li key={role.name} className="flex items-center justify-between">
                <Badge
                  variant="muted"
                  className="w-full justify-between text-base"
                >
                  <p>{role.name}</p>
                  <p>
                    {tBreakdowns("members-by-role.count", {
                      count: role.count,
                    })}
                  </p>
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <h3 className="inline-flex items-center gap-1 text-xl">
              <LuUsers />
              {tBreakdowns("members-by-branch.title")}
            </h3>
            <p className="text-muted-foreground">
              {tBreakdowns("members-by-branch.description")}
            </p>
          </div>
          <Separator className="my-3" />
          <ul className="space-y-1">
            {breakdowns.membersByBranch.map((branch) => (
              <li
                key={branch.name}
                className="flex items-center justify-between"
              >
                <Badge
                  variant="muted"
                  className="w-full justify-between text-base"
                >
                  <p>{branch.name}</p>
                  <p>
                    {tBreakdowns("members-by-branch.count", {
                      count: branch.count,
                    })}
                  </p>
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

type tVehicleModelPriceDistributionProps = {
  vehicleModelPriceDistribution: tOverviewModel["vehicleModelPriceDistribution"];
};
function VehicleModelPriceDistribution({
  vehicleModelPriceDistribution,
}: tVehicleModelPriceDistributionProps) {
  const tVehicleModelPriceDistribution = useTranslations(
    "app.partner.dashboard.page.overview.vehicle-models-price-distribution",
  );

  const locale = useLocale() as eLocale;
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const totalVehicleModelsCount = vehicleModelPriceDistribution.ranges.reduce(
    (total, { vehicleModelsCount }) => total + vehicleModelsCount,
    0,
  );

  return (
    <Card>
      <CardContent className="space-y-6">
        <div>
          <h3 className="inline-flex items-center gap-1 text-xl">
            <LuDollarSign className="text-emerald-500" />
            {tVehicleModelPriceDistribution("title")}
          </h3>
          <p className="text-muted-foreground">
            {tVehicleModelPriceDistribution("description")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="text-center">
              <p className="text-muted-foreground w-full">
                {tVehicleModelPriceDistribution("min")}
              </p>
              <p className="text-emerald-500">
                {clsMonyFormatter.format(vehicleModelPriceDistribution.min)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <p className="text-muted-foreground w-full">
                {tVehicleModelPriceDistribution("max")}
              </p>
              <p className="text-emerald-500">
                {clsMonyFormatter.format(vehicleModelPriceDistribution.max)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <p className="text-muted-foreground w-full">
                {tVehicleModelPriceDistribution("average")}
              </p>
              <p className="text-emerald-500">
                {clsMonyFormatter.format(vehicleModelPriceDistribution.average)}
              </p>
            </CardContent>
          </Card>
        </div>
        <Separator className="my-3" />
        <ul className="space-y-3">
          {vehicleModelPriceDistribution.ranges.map((range) => (
            <li key={`${range.from}-${range.to}-${range.vehicleModelsCount}`}>
              <Progress
                value={range.vehicleModelsCount}
                max={totalVehicleModelsCount}
                className="w-full rounded-full"
              >
                <div className="flex items-center justify-between gap-2">
                  <ProgressLabel>
                    <Badge variant="success">
                      {`${clsMonyFormatter.format(range.from)}${range.to ? ` - ${clsMonyFormatter.format(range.to)}` : "+"}`}
                    </Badge>
                  </ProgressLabel>
                  <ProgressValue>
                    {(_formatted, value) => (
                      <Badge variant="muted">
                        {tVehicleModelPriceDistribution("count", {
                          count: value ?? 0,
                        })}
                      </Badge>
                    )}
                  </ProgressValue>
                </div>
                <ProgressTrack>
                  <ProgressIndicator className="bg-emerald-500" />
                </ProgressTrack>
              </Progress>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
