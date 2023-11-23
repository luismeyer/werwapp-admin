"use client";

import {
  ArrowUpDown,
  MoreHorizontal,
  PauseCircleIcon,
  PlayCircleIcon,
  TrashIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { deleteSong } from "@/app/api/actions/delete-song";
import { ColumnDef, Table } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";
import { UpdateSongProperty } from "./update-song-property";

import type { Song } from "@/lib/db/schema";
type DrowDownAudioMenuItemProps = {
  url: string;
};

function DropDownMenuItemAudio({ url }: DrowDownAudioMenuItemProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();

    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  }

  return (
    <>
      <DropdownMenuItem onClick={handleClick} className="flex gap-1">
        {playing ? <PauseCircleIcon size={16} /> : <PlayCircleIcon size={16} />}
        {playing ? "Pause" : "Play"}
      </DropdownMenuItem>

      <audio ref={audioRef} src={url} />
    </>
  );
}

export const COLUMNS: ColumnDef<Song>[] = [
  {
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="flex text-lg justify-center">{row.original.id}</span>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    cell: ({ row }) => (
      <UpdateSongProperty
        type="select"
        songId={row.original.id}
        valueKey="type"
        defaultValue={row.original.type ?? "day"}
        options={["day", "night"]}
      />
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => (
      <UpdateSongProperty
        type="text"
        songId={row.original.id}
        valueKey="artist"
        defaultValue={row.original.artist}
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <UpdateSongProperty
        type="text"
        songId={row.original.id}
        valueKey="title"
        defaultValue={row.original.title}
      />
    ),
  },
  {
    accessorKey: "songPage",
    header: "Song Page",
    cell: ({ row }) => (
      <UpdateSongProperty
        type="text"
        songId={row.original.id}
        valueKey="songPage"
        defaultValue={row.original.songPage}
      />
    ),
  },
  {
    accessorKey: "songUrl",
    header: "Song URL ",
    cell: ({ row }) => (
      <UpdateSongProperty
        type="text"
        songId={row.original.id}
        valueKey="songUrl"
        defaultValue={row.original.songUrl}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row: { original } }) => {
      async function handleDeleteClick() {
        const error = await deleteSong(original.id);

        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error,
          });
        } else {
          toast({
            variant: "default",
            title: "Song deleted!",
            description: `Song ${original.id} has been deleted.`,
          });
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropDownMenuItemAudio url={original.songUrl} />

            <DropdownMenuItem
              className="flex gap-1"
              onClick={handleDeleteClick}
            >
              <TrashIcon size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type SongTableProps = {
  songData: Song[];
};

export function SongTable({ songData }: SongTableProps) {
  function Pagination(props: { table: Table<Song> }) {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => props.table.previousPage()}
          disabled={!props.table.getCanPreviousPage()}
        >
          previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => props.table.nextPage()}
          disabled={!props.table.getCanNextPage()}
        >
          next
        </Button>
      </div>
    );
  }

  return (
    <DataTable
      columns={COLUMNS}
      data={songData}
      initialSortingState={[{ desc: true, id: "id" }]}
      topRightSlot={Pagination}
      pagination
      globelFilterPlaceholder="filter songs..."
    />
  );
}
