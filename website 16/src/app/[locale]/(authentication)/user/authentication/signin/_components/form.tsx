"use client";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCredentials, zCredentials } from "@/validations/credentials";
import { useForm } from "react-hook-form";

import { Form as ReactHookForm } from "@/components/shadcn/form";
import { Input } from "@/components/locals/blocks/input";
import { Button } from "@/components/shadcn/button";
import { Authentication } from "@/services/authentication/authentication";

export default function Form() {
  const form = useForm<TCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zCredentials),
  });

  function onSubmit(credentials: z.infer<typeof zCredentials>) {
    Authentication.signin(credentials);
  }

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
            placeholder: "user@vheexa.com",
            type: "email",
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
            placeholder: "********",
            type: "password",
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
