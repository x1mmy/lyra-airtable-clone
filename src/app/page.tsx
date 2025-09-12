import HomePage from "./components/homePage/Home";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  // Redirect to sign-in if not authenticated
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  // If authenticated, render the home page
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
}