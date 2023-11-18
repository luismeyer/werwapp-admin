"use client";

import { icons, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button, ButtonProps } from "./ui/button";

type SubmitProps = {
  variant?: ButtonProps["variant"];
  icon?: keyof typeof icons;
  label?: string;
};

export function Submit({
  label = "create",
  variant,
  icon = "Upload",
}: SubmitProps) {
  const { pending } = useFormStatus();

  const Icon = icons[icon];
  return (
    <Button variant={variant} className="flex gap-2" type="submit">
      {pending ? <Loader size={20} /> : <Icon size={20} />}

      {label}
    </Button>
  );
}
