"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { useCollectionDescribe } from "@/hooks/use-collection-describe";

type Props = {};

type RouteParams = {
  databaseName: string;
  collectionName: string;
};

export const CollectionDetail: FC<Props> = () => {
  const { databaseName = "", collectionName = "" } = useParams<RouteParams>();
  const { data, isLoading } = useCollectionDescribe({
    databaseName,
    collectionName,
  });

  return (
    <div>
      <pre className="bg-muted p-2 rounded-md">
        <code className="text-xs whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    </div>
  );
};
