import { createNextRouteHandler } from "uploadthing/next";
import { fileRouter } from "../image-upload";

export const { GET, POST } = createNextRouteHandler({
  router: fileRouter,
});
