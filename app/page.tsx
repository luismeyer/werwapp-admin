import { Home } from "@/components/home";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <Home />;
}
