"use client";

import { createSong } from "@/app/api/create-song";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "./ui/use-toast";
import { Submit } from "./submit";

export function SongForm() {
  const [state, formAction] = useFormState(createSong, undefined);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.error,
      });
    } else {
      formRef.current?.reset();

      toast({
        variant: "default",
        title: "Song created!",
        description: `Created new Song.`,
      });
    }
  }, [state]);

  return (
    <div className="grid">
      <form className="grid gap-4" action={formAction} ref={formRef}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Create a new song</h2>
          <Submit />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input name="artist" placeholder="artist" required />

            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key="day" value="day">
                  day
                </SelectItem>
                <SelectItem key="night" value="night">
                  night
                </SelectItem>
              </SelectContent>
            </Select>

            <Input name="title" placeholder="title" required />
          </div>

          <div className="flex gap-2">
            <Input name="songPage" placeholder="song page" required />

            <Input name="songUrl" placeholder="song url" required />
          </div>
        </div>
      </form>
    </div>
  );
}
