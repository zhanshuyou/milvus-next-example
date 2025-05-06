import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getData } from "@/app/utils/milvus";

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
        <li>
          <Link href="/data">
            <Button variant="link" className="hover:text-cyan-500">
              Data Operations
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/collection">
            <Button variant="link" className="hover:text-cyan-500">
              Collection Operations
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/langchain">
            <Button variant="link" className="hover:text-cyan-500">
              LangChain
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
