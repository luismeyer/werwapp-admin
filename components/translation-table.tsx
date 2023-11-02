"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowUpDown, UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMemo, useRef, useState } from "react";
import { updateTranslations } from "@/app/api/update-translations";
import { Spinner } from "./ui/spinner";
import Link from "next/link";

type TranslationTableProps = {
  data: Record<string, string>;
  pathname: string;
  url: string;
};

type Translation = {
  id: number;
  key: string;
  value: string;
};

export function TranslationTable({
  data,
  pathname,
  url,
}: TranslationTableProps) {
  const initialData: Record<number, Translation> = useMemo(
    () =>
      Object.entries(data).reduce(
        (acc, [key, value], index) => ({
          ...acc,
          [index]: { key, value, id: index },
        }),
        {}
      ),
    [data]
  );

  const [rows, setRows] = useState(Object.values(initialData));

  const persistData = useRef(initialData);

  const columns: ColumnDef<Translation>[] = [
    {
      accessorKey: "key",
      cell: ({ row }) => (
        <Input
          defaultValue={row.original.key}
          onChange={({ target }) => {
            persistData.current[row.original.id].key = target.value;
          }}
        />
      ),
      header: ({ column }) => (
        <Button
          className="flex w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "value",
      cell: ({ row }) => (
        <Textarea
          defaultValue={row.original.value}
          onChange={({ target }) => {
            persistData.current[row.original.id].value = target.value;
          }}
        />
      ),
      header: ({ column }) => (
        <Button
          className="flex w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);

  async function handleSubmit(table: Table<Translation>) {
    const values = Object.values(persistData.current);

    const translations = values.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {}
    );

    setLoading(true);

    await updateTranslations(pathname, translations);

    table.setGlobalFilter("");
    setLoading(false);
    setRows(Object.values(persistData.current));
  }

  return (
    <DataTable
      columns={columns}
      topRightSlot={({ table }) => (
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link target="_blank" href={`/api/blob?url=${url}`}>
              view raw json
            </Link>
          </Button>

          <Button onClick={() => handleSubmit(table)} className="flex gap-2">
            {loading ? <Spinner size={20} /> : <UploadIcon size={20} />}
            Submit
          </Button>
        </div>
      )}
      data={rows}
      initialSortingState={[{ id: "key", desc: false }]}
      globelFilterPlaceholder="Search for a key or value"
    />
  );
}
