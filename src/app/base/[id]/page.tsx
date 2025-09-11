import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { BaseView } from "./_components/base-view";

interface BasePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BasePage({ params }: BasePageProps) {
  const { id } = await params;
  const base = await api.base.getById({ id });

  if (!base) {
    redirect("/dashboard");
  }

  return <BaseView base={base} />;
}
