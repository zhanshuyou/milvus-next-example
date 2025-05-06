import Link from "next/link";

import { getData } from "./utils/milvus";

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <ul>
        <li>
          <Link href="/collection">Collection</Link>
        </li>
        <li>
          <Link href="/data">Data</Link>
        </li>
        <li>
          <Link href="/langchain">LangChain</Link>
        </li>
      </ul>
    </div>
  );
}
