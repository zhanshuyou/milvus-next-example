"use client";

import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { data: databases } = useSWR(["/api/milvus/databases"], async () => {
    const res = await axios.get<{
      db_names: string[];
      db_ids: string[];
      created_timestamp: string[];
    }>("/api/milvus/databases");
    return res.data;
  });
  return (
    <div className="p-4 grid">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            Databases ({databases?.db_names.length ?? "--"})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {databases?.db_names.map((db) => {
            return (
              <Link key={db} href={`/database/${db}`}>
                {db}
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
