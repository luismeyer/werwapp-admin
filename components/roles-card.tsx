"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";

import { PlayerRoleDef, RoleDef } from "@/app/api/roles";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useRef } from "react";
import { uploadImage } from "@/app/api/upload-image";

type RolesCardProps = {
  combineOptions: string[];
  role: RoleDef;
  onRoleChange: (role: Partial<RoleDef>) => void;
  onRoleDelete: () => void;
  index: number;
};

export function RolesCard({
  role,
  combineOptions,
  onRoleChange,
  onRoleDelete,
  index,
}: RolesCardProps): JSX.Element | null {
  const imageRef = useRef<HTMLInputElement>(null);

  const upload = () => {
    imageRef.current?.click();
  };

  if (role.type === "util") {
    return (
      <Card className="overflow-hidden flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="grid gap-2 text-xl">{role.name}</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-2">
          <div>
            <Label htmlFor="name">Order</Label>

            <Input
              type="number"
              id="order"
              value={role.order}
              placeholder="order"
              onChange={(e) =>
                onRoleChange({ ...role, order: Number(e.target.value) })
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <input
        ref={imageRef}
        hidden
        multiple={false}
        type="file"
        name="image"
        onChange={async (event) => {
          const [file] = event.target.files ?? [];

          const [ext] = /(?:\.([^.]+))?$/.exec(file.name) ?? [];

          if (!ext) {
            return;
          }

          const form = new FormData();
          form.set("image", file);
          form.set("name", `${role.name}${ext}`);

          const url = await uploadImage(form);

          onRoleChange({ ...role, image: url });
        }}
      />

      {role.image.length ? (
        <Image
          className="cursor-pointer"
          priority={index <= 3}
          draggable={false}
          alt={`image of ${role.name}`}
          src={role.image}
          width={300}
          height={300}
          onClick={upload}
        />
      ) : (
        <button
          onClick={upload}
          className="w-full aspect-square bg-gray-100 flex justify-center items-center cursor-pointer"
        >
          <span>upload avatar image</span>
        </button>
      )}

      <CardHeader>
        <CardTitle className="grid gap-2">
          <div>
            <Label htmlFor="name">Order</Label>

            <Input
              type="number"
              id="order"
              value={role.order}
              placeholder="order"
              onChange={(e) =>
                onRoleChange({ ...role, order: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label htmlFor="name">Name</Label>

            <Input
              type="text"
              id="name"
              value={role.name}
              placeholder="name"
              onChange={(e) => onRoleChange({ ...role, name: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="addable">Can be added by user</Label>
            <Switch
              id="addable"
              checked={role.addable}
              onCheckedChange={(addable) => onRoleChange({ ...role, addable })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="evil">Is evil role</Label>
            <Switch
              id="evil"
              checked={role.isEvil}
              onCheckedChange={(isEvil) => onRoleChange({ ...role, isEvil })}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2">
        <div>
          <Label htmlFor="prefix">Gender prefix</Label>
          <Select
            name="prefix"
            required
            value={role.prefix}
            onValueChange={(value) =>
              onRoleChange({
                ...role,
                prefix: value as PlayerRoleDef["prefix"],
              })
            }
          >
            <SelectTrigger id="prefix">
              <SelectValue placeholder="prefix" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem key="feminimum" value="feminimum">
                feminimum
              </SelectItem>
              <SelectItem key="masculinum" value="masculinum">
                masculinum
              </SelectItem>
              <SelectItem key="neutrum" value="neutrum">
                neutrum
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="state">Active at</Label>
          <Select
            name="state"
            required
            value={role.state}
            onValueChange={(value) =>
              onRoleChange({
                ...role,
                state: value as PlayerRoleDef["state"],
              })
            }
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="state" />
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
        </div>

        <div>
          <Label htmlFor="combinedWith">Is combined with</Label>
          <Select
            name="combinedWith"
            required
            defaultValue="none"
            value={role.combinedWith}
            onValueChange={(value) =>
              onRoleChange({
                ...role,
                combinedWith: value as PlayerRoleDef["combinedWith"],
              })
            }
          >
            <SelectTrigger id="combinedWith">
              <SelectValue placeholder="combinedWith" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem key="none" value="none">
                none
              </SelectItem>
              {combineOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="activeNights">Active nights</Label>
          <Input
            id="activeNights"
            placeholder="activeNights"
            value={role.activeNights ? role.activeNights.join(",") : "All"}
            onChange={(e) =>
              onRoleChange({
                ...role,
                activeNights: e.target.value.split(",").map(Number),
              })
            }
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="destructive" onClick={onRoleDelete}>
          <TrashIcon size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
