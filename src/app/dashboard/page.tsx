import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./_components/dashboard-content";

export default async function Dashboard() {
  try {
    const session = await auth();

    if (!session?.user) {
      redirect("/signin");
    }

    return <DashboardContent user={session.user} />;
  } catch (error) {
    console.error("Auth error in dashboard:", error);
    redirect("/signin");
  }
}
