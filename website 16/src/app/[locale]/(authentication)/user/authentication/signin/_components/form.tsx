"use client";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { tCredentials, zCredentials } from "@/validations/credentials";
import { useForm } from "react-hook-form";

import { Form as ReactHookForm } from "@/components/shadcn/form";
import { Input } from "@/components/locals/blocks/input";
import { Button } from "@/components/shadcn/button";
import { AuthenticationService } from "@/services/authentication/authentication";

export default function Form() {
  const form = useForm<tCredentials>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(zCredentials),
  });

  function onSubmit(credentials: z.infer<typeof zCredentials>) {
    AuthenticationService.signin(credentials);
  }

  return (
    <ReactHookForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Input
          formField={{
            control: form.control,
            name: "Email",
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
            name: "Password",
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
