"use client";

import { PlayerRoleDef, RoleDef } from "@/app/api/roles";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

type RolesCardProps = {
  combineOptions: string[];
  role: RoleDef;
  onRoleChange: (role: Partial<PlayerRoleDef>) => void;
};

function RolesCard({
  role,
  combineOptions,
  onRoleChange,
}: RolesCardProps): JSX.Element | null {
  if (role.type === "util") {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <input className="hidden" type="file" name="image" />
      <Image
        alt={`image of ${role.name}`}
        src={role.image}
        width={300}
        height={300}
      />

      <CardHeader>
        <CardTitle className="grid gap-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
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
    </Card>
  );
}

type RolesListProps = {
  roles: RoleDef[];
};

export function RolesList({ roles }: RolesListProps): JSX.Element {
  const playerRoles = roles.filter(
    (role): role is PlayerRoleDef => role.type === "player"
  );

  const [rolesState, setRolesState] = useState(
    playerRoles.reduce<Record<string, PlayerRoleDef>>(
      (acc, role) => ({
        ...acc,
        [role.name]: role,
      }),
      {}
    )
  );

  const updateRole = (id: string, role: Partial<PlayerRoleDef>) => {
    setRolesState((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...role },
    }));
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(rolesState).map(([key, role]) => (
        <RolesCard
          key={key}
          role={role}
          combineOptions={playerRoles.map(({ name }) => name)}
          onRoleChange={(role) => updateRole(key, role)}
        />
      ))}
    </div>
  );
}
