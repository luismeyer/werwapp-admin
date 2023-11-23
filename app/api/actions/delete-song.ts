"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { songs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function deleteSong(id: number) {
  const session = await getServerSession();

  if (!session?.user) {
    return "Not logged in";
  }

  try {
    await db.delete(songs).where(eq(songs.id, id));
  } catch (error) {
    return "Something went wrong!";
  }

  revalidatePath("/songs");
}
