"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z, { ZodError } from "zod";

import { db } from "@/lib/db";
import { songs } from "@/lib/db/schema";

const InputSchema = z.object({
  type: z.enum(["day", "night"]),
  artist: z.string(),
  title: z.string(),
  songPage: z.string().url(),
  songUrl: z.string().url(),
});

type State = {
  timestamp: number;
  error?: string;
};

function createResponse(error?: string): State {
  return { timestamp: Date.now(), error };
}

export async function createSong(
  _state: State,
  input: FormData
): Promise<State> {
  const session = await getServerSession();

  if (!session?.user) {
    return createResponse("Not logged in");
  }

  const inputObject = Object.fromEntries(input.entries());

  try {
    const values = InputSchema.parse(inputObject);

    await db.insert(songs).values(values);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const [issue] = error.issues;

      return createResponse(`${issue.path.join()}: ${issue.message}`);
    } else {
      return createResponse("Something went wrong!");
    }
  }

  revalidatePath("/songs");

  return createResponse();
}
