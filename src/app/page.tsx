import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  // Redirect to dashboard if user is authenticated, otherwise to sign-in
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }
}
