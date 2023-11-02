import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SongForm } from "@/components/song-form";

import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { SongData } from "@/components/song-data";

export default async function Songs() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="grid">
      <SongForm />

      <Separator className="my-12" />

      <Suspense>
        <SongData />
      </Suspense>
    </main>
  );
}
