import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getData } from "@/app/utils/milvus";

const linkConfigs = [
  {
    label: "Data Operations",
    href: "/data",
  },
  {
    label: "Collection Operations",
    href: "/collection",
  },
  {
    label: "LangChain",
    href: "/langchain",
  },
];

export default async function Home() {
  const data = await getData();
  return (
    <div className="p-4">
      <Alert>
        <AlertDescription className="text-gray-500">
          {JSON.stringify(data)}
        </AlertDescription>
      </Alert>

      <ul className="mt-6">
        {linkConfigs.map((item) => {
          return (
            <li key={item.href}>
              <Link href={item.href}>
                <Button variant="link" className="hover:text-cyan-500">
                  {item.label}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
