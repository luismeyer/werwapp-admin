import { LoginButton } from "@/components/login-button";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-[350px] flex flex-col gap-5">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>

        <p className="text-zinc-500 dark:text-zinc-400">
          Click the button below to login to your account
        </p>
      </div>

      <LoginButton />
    </div>
  );
}
