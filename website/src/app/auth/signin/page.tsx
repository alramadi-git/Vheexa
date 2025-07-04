import Form from "@/app/auth/signin/_components/form";

import Link from "next/link";
import { Button } from "@/app/_components/shadcn/button";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";

export const dynamic = "force-static";
export const metadata = {
  title: "signin",
};

function Page() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      {/** Header */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-balance">
          Sign in to your Vheexa account
        </p>
      </div>

      {/** Form */}
      <Form />

      {/** Separator */}
      <div className="mt-auto after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      {/** Auth Providers */}
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" type="button" className="w-full">
          <FaApple />
        </Button>
        <Button variant="outline" type="button" className="w-ful">
          <FaGoogle />
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <FaMeta />
        </Button>
      </div>

      {/** Create an Account */}
      <p className="text-sm">
        {"Don't"} have an account?{" "}
        <Button variant="link" className="p-0 hover:text-blue-500 duration-[0]">
          <Link href="/auth/signup">Create one</Link>
        </Button>
      </p>
    </div>
  );
}

export default Page;
