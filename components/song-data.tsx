import { db } from "@/lib/db";
import { SongTable } from "./song-table";
import { songs } from "@/lib/db/schema";

export async function SongData() {
  const songData = await db.select().from(songs);

  return <SongTable songData={songData} />;
}
