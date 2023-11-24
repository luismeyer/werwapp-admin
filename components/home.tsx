"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

type ItemProps = {
  hovered: number;
  setHovered: (hovered: number) => void;
  name: string;
  index: number;
};

function Item({ hovered, setHovered, name, index }: ItemProps) {
  const left = { 1: 0.15, 2: 0.5, 3: 0.85 }[index] ?? 0;

  return (
    <>
      <div
        className={clsx(
          "relative w-1/3 h-full transition-all duration-700",
          hovered === index && "w-screen",
          hovered !== index && hovered !== 0 && "w-0"
        )}
      >
        <Image className="object-cover" fill alt={name} src={`/${name}.png`} />
      </div>

      <Button
        variant="link"
        asChild
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(0)}
        style={{ left: `${left * 100}%` }}
        className={clsx(
          "fixed top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 drop-shadow-xl text-white text-4xl",
          { "opacity-0": hovered !== index && hovered !== 0 }
        )}
      >
        <Link href={name}>{name}</Link>
      </Button>
    </>
  );
}

export function Home() {
  const [hovered, setHovered] = useState(0);

  return (
    <main className="relative h-screen w-screen overflow-hidden flex -mx-12 -mt-28">
      <Item hovered={hovered} setHovered={setHovered} index={1} name="songs" />

      <Item
        hovered={hovered}
        setHovered={setHovered}
        index={2}
        name="translations"
      />

      <Item hovered={hovered} setHovered={setHovered} index={3} name="roles" />
    </main>
  );
}
