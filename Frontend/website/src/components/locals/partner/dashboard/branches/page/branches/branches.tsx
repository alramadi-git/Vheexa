"use client";

import useBranches from "@/hooks/partner/branches";
import { ClsBranchService } from "@/services/partner/branch";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

import { tBranchCreate, zBranchCreate } from "@/validations/partner/branch";
import { zodResolver } from "@hookform/resolvers/zod";


import { useForm, Controller } from "react-hook-form";

import { LuPlus, LuLoader } from "react-icons/lu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";
import { Separator } from "@/components/shadcn/separator";

import { Section, Intro, Toast } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import { Button } from "@/components/shadcn/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { toast } from "sonner";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

export default function Branches() {
  const tBranches = useTranslations(
    "app.partner.dashboard.branches.page.branches",
  );

  const { isLoading, result } = useBranches();

  console.log(result);

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex items-end justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tBranches("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tBranches("description")}</Description>
            </CardDescription>
          </Intro>
          <AddNew />
        </CardHeader>
        <CardContent className="block space-y-6">
          <Filter />
          <Card>
            <CardContent className="space-y-6">
              <Table
                isLoading={isLoading}
                isSuccess={result?.isSuccess || false}
                data={result?.isSuccess ? result.data : []}
              />
              {!isLoading && result?.isSuccess && (
                <Pagination pagination={result.pagination} />
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Section>
  );
}

type tStatues = {
  value: string;
  label: string;
};

function AddNew() {
  const clsBranchService = new ClsBranchService();

  const tAddNew = useTranslations(
    "app.partner.dashboard.branches.page.branches.add-new",
  );

  const statuses: tStatues[] = tAddNew.raw("content.form.status.statuses");

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tBranchCreate>({
    defaultValues: {
      status: 0,
    },
    resolver: zodResolver(zBranchCreate),
  });

  function reset(): void {
    handleReset();
  }
  async function submit(data: tBranchCreate): Promise<void> {
    const result = await clsBranchService.addAsync(data);

    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAddNew("content.form.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast variant="success" label={tAddNew("content.form.when-success")} />
    ));

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          {tAddNew("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col overflow-auto p-12"
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">
            {tAddNew("content.title")}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {tAddNew("content.description")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-1 mb-6" />

        <form
          onReset={reset}
          onSubmit={handleSubmit(submit)}
          className="flex grow flex-col gap-6"
        >
          <FieldGroup className="grid-cols-3">
            <Controller
              control={control}
              name="status"
              render={({
                field: { value, onChange: setValue, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel htmlFor="status">
                    {tAddNew("content.form.status.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Select
                      {...field}
                      value={value.toString()}
                      onValueChange={(val) => setValue(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={tAddNew(
                            "content.form.status.placeholder",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid-cols-2">
            <Button
              variant="outline"
              disabled={formState.isSubmitting}
              type="reset"
              className="mt-auto"
            >
              {tAddNew("content.form.actions.reset")}
            </Button>
            <Button
              disabled={formState.isSubmitting}
              type="submit"
              className="mt-auto"
            >
              {formState.isSubmitting && (
                <LuLoader size={16} className="animate-spin" />
              )}
              {tAddNew("content.form.actions.submit")}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
