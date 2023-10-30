"use client";

import { KeyboardEvent, useState } from "react";

import { updateSong } from "@/app/api/update-song";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import type { Song } from "@/lib/db/schema";
import { useToast } from "./ui/use-toast";

type SongInputProps =
  | {
      type: "text" | "url";
      songId: number;
      valueKey: keyof Song;
      defaultValue: string;
    }
  | {
      type: "select";
      songId: number;
      valueKey: keyof Song;
      defaultValue: string;
      options: string[];
    };

export function SongInput(props: SongInputProps) {
  const { defaultValue, songId, valueKey, type } = props;

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const { toast } = useToast();

  async function submitUpdate(newValue: string) {
    if (newValue === defaultValue) {
      return;
    }

    setLoading(true);

    const error = await updateSong(songId, { [valueKey]: newValue });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });

      setValue(defaultValue);
    } else {
      toast({
        variant: "default",
        title: "Song updated!",
        description: `The song's ${valueKey} has been saved to the database.`,
      });
    }

    setLoading(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      submitUpdate((event.target as HTMLInputElement).value);
    }
  }

  if (type === "select") {
    const { options } = props;

    return (
      <Select
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          submitUpdate(newValue);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={type} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <>
      <Input
        type={type}
        name={valueKey}
        onKeyDown={handleKeyDown}
        onBlur={(e) => submitUpdate(e.target.value)}
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
