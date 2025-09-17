import { FC } from "react";
import { useCollections } from "@/hooks/use-collections";
import { cn } from "@/lib/utils";

type Props = {
  database: string;
};

export const Collections: FC<Props> = (props) => {
  const { database } = props;
  const { data: collections, isLoading } = useCollections(database);
  const isEmpty = !isLoading && collections?.length === 0;

  return (
    <div>
      {isLoading && <div className="text-gray-500 text-xs">Loading...</div>}
      {isEmpty && <div className="text-gray-400 text-xs">Empty</div>}
      <ul>
        {collections?.map((collection) => (
          <li
            key={collection.id}
            className={cn(
              "py-1 px-2 rounded-md hover:bg-muted cursor-pointer text-sm truncate",
              "hover:text-violet-500 hover:underline"
            )}
          >
            {collection.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
