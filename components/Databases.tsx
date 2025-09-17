"use client";

import { FC } from "react";
import { useDatabases } from "@/hooks/use-databases";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/components/DatabaseItem";

type Props = {};

export const Databases: FC<Props> = () => {
  const { data: databases, isLoading } = useDatabases();

  if (isLoading) {
    return (
      <div className="p-2 space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {databases?.map((db) => (
        <li key={db.id}>
          <Database database={db} />
        </li>
      ))}
    </ul>
  );
};
