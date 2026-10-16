import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  });
  if (!user) redirect("/login");

  const dateConnexion = session.loginAt.toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <main className="mx-auto max-w-md space-y-4 pt-24 text-center">
      <h1 className="text-2xl font-bold">Bienvenue {user.name} !</h1>
      <p>Connecté le {dateConnexion}</p>
      <LogoutButton />
    </main>
  );
}