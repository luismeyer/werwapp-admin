import { getServerSession } from "next-auth";
import {
  createUploadthing,
  type FileRouter as UTFileRouter,
} from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession();

      if (!session?.user) throw new Error("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies UTFileRouter;

export type FileRouter = typeof fileRouter;
