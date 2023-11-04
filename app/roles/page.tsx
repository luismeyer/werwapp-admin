import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RolesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex justify-center">
      <h1 className="text-3xl">not implemented yet</h1>
    </main>
  );
}
