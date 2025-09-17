import { DatabaseSidebar } from "@/components/DatabaseSidebar";

export default async function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DatabaseSidebar>{children}</DatabaseSidebar>;
}
