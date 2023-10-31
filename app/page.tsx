import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="grid place-content-center gap-4">
      <h1 className="text-3xl">You can view the following ressources</h1>
      <div className="flex gap-2 justify-around">
        <Button asChild variant="secondary">
          <Link href="roles">roles</Link>
        </Button>

        <Button asChild variant="secondary">
          <Link href="translations">translations</Link>
        </Button>

        <Button asChild variant="secondary">
          <Link href="songs">songs</Link>
        </Button>
      </div>
    </main>
  );
}
