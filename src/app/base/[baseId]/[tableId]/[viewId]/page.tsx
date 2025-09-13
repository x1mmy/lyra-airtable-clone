import BasePage from "~/app/components/basePage/BasePage";
import { HydrateClient } from "~/trpc/server";

export default async function Base() {
  return (
    <HydrateClient>
      <BasePage/>
    </HydrateClient>
  );
}