import HomePage from "./components/homePage/Home";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
}