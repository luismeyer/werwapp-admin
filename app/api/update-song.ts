"use server";

import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z, { ZodError } from "zod";

import { db } from "@/lib/db";
import { songs } from "@/lib/db/schema";

const InputSchema = z.object({
  type: z.enum(["day", "night"]).optional(),
  artist: z.string().optional(),
  title: z.string().optional(),
  songPage: z.string().url().optional(),
  songUrl: z.string().url().optional(),
});

export async function updateSong(
  id: number,
  input: z.infer<typeof InputSchema>
) {
  const session = await getServerSession();

  if (!session?.user) {
    return "Not logged in";
  }

  try {
    const values = InputSchema.parse(input);

    await db.update(songs).set(values).where(eq(songs.id, id));
  } catch (error) {
    if (error instanceof ZodError) {
      return error.issues[0].message;
    } else {
      return "Something went wrong!";
    }
  }

  revalidatePath("/songs");
}
