import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import z from "zod";

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error("Missing env var: GITHUB_CLIENT_ID");
}

if (!process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing env var: GITHUB_CLIENT_SECRET");
}

if (!process.env.GITHUB_ADMIN_IDS) {
  throw new Error("Missing env var: VERCEL_ORGITHUB_ADMIN_IDSG_ID");
}

const adminGithubIds: number[] =
  process.env.GITHUB_ADMIN_IDS.split(",").map(Number);

const GithubUserSchema = z.object({
  id: z.number(),
});

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => {
      const parseResult = GithubUserSchema.safeParse(profile);

      return (
        parseResult.success && adminGithubIds.includes(parseResult.data.id)
      );
    },
  },
});

export { handler as GET, handler as POST };
