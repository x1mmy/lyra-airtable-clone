import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./_components/dashboard-content";

// This is needed to ensure the page is dynamic and not cached
export const dynamic = 'force-dynamic';

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
