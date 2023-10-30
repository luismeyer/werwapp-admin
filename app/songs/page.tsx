import { getServerSession } from "next-auth";
import { db } from "../../lib/db";
import { songs } from "../../lib/db/schema";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";

export default async function Songs() {
  const session = await getServerSession();

  if (!session) {
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
              <TableCell>{song.type}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.songPage}</TableCell>
              <TableCell>{song.songUrl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
