import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import SignInButton from "./sign-in-button";

export default async function SignInPage() {
  const session = await auth();
  // Redirect to home if already authenticated
  if (session?.user) {
    redirect("/");
  }
  // If not authenticated, render the sign-in page
  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(250,250,251)]">
      <SignInButton />
    </div>
  );
}


