"use client";

import { FormEvent, useState } from "react";

import { Submit } from "./submit";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

type TranslationFormProps = {
  onSubmit: (newKey: string, newValue: string) => void;
};

export function TranslationForm({ onSubmit }: TranslationFormProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(key, value);

    setKey("");
    setValue("");

    toast({
      variant: "default",
      title: "Added Translations!",
      description: `Make sure to commit the changes.`,
    });
  }

  return (
    <form
      className="grid grid-cols-2 gap-2 mt-4 items-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl">Create a new translation</h2>

      <div className="flex justify-end">
        <Submit variant="secondary" label="add" icon="Plus" />
      </div>

      <Textarea
        name="newKey"
        placeholder="new key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <Textarea
        name="newTranslation"
        placeholder="new translation"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
