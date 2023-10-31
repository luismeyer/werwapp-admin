import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SongForm } from "@/components/song-form";
import { SongTable } from "@/components/song-table";

import { db } from "../../lib/db";
import { songs } from "../../lib/db/schema";
import { Separator } from "@/components/ui/separator";

export default async function Songs() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  const songData = await db.select().from(songs);

  return (
    <main className="grid px-12">
      <div className="grid gap-4">
        <h1 className="text-center text-3xl">All Songs</h1>
        <SongTable songData={songData} />
      </div>

      <Separator className="my-12" />

      <SongForm />
    </main>
  );
}
