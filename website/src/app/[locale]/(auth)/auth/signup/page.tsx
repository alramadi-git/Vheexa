"use client";

import z4 from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/shadcn/form";
import { Button } from "@/components/shadcn/button";
import Input from "@/components/locals/blocks/input";

const FORM_SCHEMA = z4.object({
  email: z4.email(),
  password: z4.string().min(8),
});

export default function Page() {
  const form = useForm<z4.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z4.infer<typeof FORM_SCHEMA>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <Input
          formField={{
            control: form.control,
            name: "email",
          }}
          label="Email"
          input={{
            type: "email",
            placeholder: "user@vheexa.com",
          }}
          description="Description"
        />

        <Input
          formField={{
            control: form.control,
            name: "password",
          }}
          label="Password"
          input={{
            type: "password",
            placeholder: "********",
          }}
          description="Description"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
