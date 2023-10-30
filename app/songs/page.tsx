import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SongInput } from "@/components/song-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { db } from "../../lib/db";
import { songs } from "../../lib/db/schema";

export default async function Songs() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  const songData = await db.select().from(songs);

  return (
    <main className="px-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Song Page</TableHead>
            <TableHead>Song URL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songData.map((song) => (
            <TableRow key={song.id}>
              <TableCell className="font-medium">{song.id}</TableCell>

              <TableCell>
                <SongInput
                  type="select"
                  songId={song.id}
                  valueKey="type"
                  defaultValue={song.type ?? "day"}
                  options={["day", "night"]}
                />
              </TableCell>

              <TableCell>
                <SongInput
                  type="text"
                  songId={song.id}
                  valueKey="artist"
                  defaultValue={song.artist}
                />
              </TableCell>

              <TableCell>
                <SongInput
                  type="text"
                  songId={song.id}
                  valueKey="title"
                  defaultValue={song.title}
                />
              </TableCell>

              <TableCell>
                <SongInput
                  type="url"
                  songId={song.id}
                  valueKey="songPage"
                  defaultValue={song.songPage}
                />
              </TableCell>

              <TableCell>
                <SongInput
                  type="url"
                  songId={song.id}
                  valueKey="songUrl"
                  defaultValue={song.songUrl}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
