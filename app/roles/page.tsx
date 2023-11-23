import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RolesData } from "@/components/roles-data";
import { Suspense } from "react";
import { kv } from "@vercel/kv";

export default async function RolesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex justify-center">
      <Suspense>
        <RolesData />
      </Suspense>
    </main>
  );
}
