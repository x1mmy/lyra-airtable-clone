"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    // Sign in with Google button
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
    >
      Sign in with Google
    </button>
  );
}


