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
import { Button } from "./ui/button";
import { UploadIcon, Loader } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "./ui/use-toast";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button className="self-end flex gap-2 px-8" type="submit">
      {pending ? <Loader /> : <UploadIcon />}
      Create
    </Button>
  );
}

export function SongForm() {
  const [state, formAction] = useFormState(createSong, {
    timestamp: Date.now(),
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.error) {
      formRef.current?.reset();
      return;
    }

    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: state.error,
    });
  }, [state]);

  return (
    <div className="grid pb-32">
      <form className="grid gap-4" action={formAction} ref={formRef}>
        <h2 className="text-3xl text-center">Create a new song</h2>

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

          <Submit />
        </div>
      </form>
    </div>
  );
}
