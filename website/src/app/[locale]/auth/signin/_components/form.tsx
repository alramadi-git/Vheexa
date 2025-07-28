"use client";

import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import Input from "@/components/locals/blocks/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as ReactHookForm } from "@/components/shadcn/form";

const formSchema = z.object({
  email: z.email(),
});
interface IFormSchema extends z.infer<typeof formSchema> {}

export default function Form() {
  const form = useForm<IFormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <ReactHookForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Input
          formField={{
            control: form.control,
            name: "email",
          }}
          label="Email"
          input={{
            placeholder: "example@gmail.com",
            type: "email",
          }}
          description="Description"
        />

        <Button type="submit" variant="outline" className="w-full">
          Sign In
        </Button>
      </form>
    </ReactHookForm>
  );
}
