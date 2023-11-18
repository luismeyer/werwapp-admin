"use client";

import { PlusIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { PlayerRoleDef, RoleDef } from "@/app/api/roles";
import { updateRoles } from "@/app/api/update-roles";

import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { RolesCard } from "./roles-card";
import { toast } from "./ui/use-toast";

type RolesState = Record<string, RoleDef>;

type RolesListProps = {
  roles: RolesState;
};

export function RolesList({ roles }: RolesListProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [rolesState, setRolesState] = useState(roles);

  const playerRoles = Object.values(rolesState).filter(
    (role): role is PlayerRoleDef => role.type === "player"
  );

  const updateRole = (id: string, role: Partial<RoleDef>) => {
    setRolesState((prev) => {
      const { [id]: prevValue } = prev;

      return {
        ...prev,
        [id]: { ...prevValue, ...role } as PlayerRoleDef,
      };
    });

    toast({
      variant: "default",
      title: "Updated value",
      description: "Make sure to commit to save the image",
    });
  };

  const deleteRole = (id: string) => {
    setRolesState((prev) => {
      const { [id]: _deleted, ...rest } = prev;

      return rest;
    });
  };

  const addRole = () => {
    setRolesState((prev) => ({
      [Date.now().toString()]: {
        addable: false,
        image: "",
        isEvil: false,
        name: "",
        order: 0,
        prefix: "feminimum",
        state: "night",
        type: "player",
      },
      ...Object.entries(prev).reduce<RolesState>(
        (acc, [id, role]) => ({
          ...acc,
          [id]: { ...role, order: role.order + 1 },
        }),
        {}
      ),
    }));
  };

  const commit = async () => {
    setLoading(true);
    await updateRoles(rolesState);
    setLoading(false);

    toast({
      variant: "default",
      title: "Updated roles",
      description: "Roles json file has been updated",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 justify-end">
        <Button variant="secondary" asChild>
          <Link target="_blank" href="/api/blob/roles">
            view raw json
          </Link>
        </Button>

        <Button className="flex gap-2" variant="secondary" onClick={addRole}>
          <PlusIcon size={20} /> add role
        </Button>

        <Button onClick={() => commit()} className="flex gap-2 self-end">
          {loading ? <Spinner size={20} /> : <SaveIcon size={20} />}
          commit
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
        {Object.entries(rolesState)
          .sort(([, a], [, b]) => a.order - b.order)
          .map(([key, role], index) => (
            <RolesCard
              key={key}
              index={index}
              role={role}
              combineOptions={playerRoles
                .map(({ name }) => name)
                .filter((name) => name.trim().length)}
              onRoleDelete={() => deleteRole(key)}
              onRoleChange={(role) => updateRole(key, role)}
            />
          ))}
      </div>
    </div>
  );
}
