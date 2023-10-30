import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="grid place-content-center gap-4">
      <h1 className="text-3xl">You can view the following ressources</h1>
      <div className="flex gap-2 justify-around">
        <Link href="roles">
          <Button variant="secondary">roles</Button>
        </Link>

        <Link href="translations">
          <Button variant="secondary">translations</Button>
        </Link>

        <Link href="songs">
          <Button variant="secondary">songs</Button>
        </Link>
      </div>
    </main>
  );
}
