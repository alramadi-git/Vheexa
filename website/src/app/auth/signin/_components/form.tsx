"use client";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form as ReactHookForm } from "@/app/_components/shadcn/form";
import Input from "@/app/_components/locals/blocks/input";
import { Button } from "@/app/_components/shadcn/button";

const formSchema = z.object({
  email: z.email(),
});
interface IFormSchema extends z.infer<typeof formSchema> {}

function Form() {
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

export default Form;
