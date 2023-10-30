import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Roles() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
