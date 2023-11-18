import { z } from "zod";

const PlayerRoleDefSchema = z.object({
  type: z.literal("player"),
  image: z.string(),
  state: z.enum(["day", "night"]),
  name: z.string(),
  addable: z.boolean(),
  combinedWith: z.string().optional(),
  prefix: z.enum(["feminimum", "masculinum", "neutrum"]),
  isEvil: z.boolean(),
  activeNights: z.array(z.number()).optional(),
  order: z.number(),
});

export type PlayerRoleDef = z.infer<typeof PlayerRoleDefSchema>;

const UtilityRoleDefSchema = z.object({
  type: z.literal("util"),
  state: z.enum(["day", "night"]),
  name: z.string(),
  order: z.number(),
});

const RoleDefSchema = z.union([PlayerRoleDefSchema, UtilityRoleDefSchema]);

export type RoleDef = z.infer<typeof RoleDefSchema>;

export const RoleDefRecordSchema = z.record(RoleDefSchema);

export type RoleDefRecord = z.infer<typeof RoleDefRecordSchema>;
