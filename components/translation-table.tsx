"use client";

import { ArrowUpDown, MoreHorizontal, SaveIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { updateTranslations } from "@/app/api/actions/update-translations";
import { ColumnDef, Table } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

type TranslationTableProps = {
  data: Record<string, string>;
  newTranslations: Record<string, string>;
  locale: string;
};

export type Translation = {
  id: number;
  key: string;
  value: string;
};

function translationsToRows(
  translations: Record<string, string>
): Record<number, Translation> {
  return Object.entries(translations).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      [index]: { key, value, id: index },
    }),
    {}
  );
}

export function TranslationTable({
  data,
  locale,
  newTranslations,
}: TranslationTableProps) {
  const initialData = useMemo(() => translationsToRows(data), [data]);

  const [rows, setRows] = useState(Object.values(initialData));

  const newRows = useMemo(
    () => Object.values(translationsToRows(newTranslations)),
    [newTranslations]
  );

  const persistData = useRef(initialData);

  const columns: ColumnDef<Translation>[] = [
    {
      accessorKey: "key",
      cell: ({ row }) => (
        <Textarea
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
    {
      id: "actions",
      cell: ({ row: { original } }) => {
        async function handleDeleteClick() {
          delete persistData.current[original.id];
          setRows(Object.values(persistData.current));

          toast({
            variant: "default",
            title: "Removed Translations!",
            description: `Make sure to commit the changes!`,
          });
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
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

  const [loading, setLoading] = useState(false);

  async function handleSubmit(table: Table<Translation>) {
    const values = Object.values(persistData.current);

    const translations = values.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {}
    );

    setLoading(true);

    await updateTranslations(locale, { ...translations, ...newTranslations });

    table.setGlobalFilter("");

    setRows(values);
    setLoading(false);
  }

  return (
    <DataTable
      columns={columns}
      topRightSlot={({ table }) => (
        <div className="flex gap-2">
          <Button onClick={() => handleSubmit(table)} className="flex gap-2">
            {loading ? <Spinner size={20} /> : <SaveIcon size={20} />}
            commit
          </Button>
        </div>
      )}
      data={[...newRows, ...rows]}
      initialSortingState={[{ id: "key", desc: false }]}
      globelFilterPlaceholder="Search for a key or value"
    />
  );
}
