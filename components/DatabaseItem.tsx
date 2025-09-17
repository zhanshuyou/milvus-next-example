"use client";

import { FC, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Collections } from "@/components/Collections";
import { type DatabaseSchema } from "@/hooks/use-databases";
import { cn } from "@/lib/utils";

type Props = {
  database: DatabaseSchema;
};

export const Database: FC<Props> = (props) => {
  const { database: db } = props;
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Collapsible onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="w-full text-left">
        <div className="py-1 px-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium flex items-center justify-between">
          <span className="flex-1 truncate">{db.name}</span>
          <ChevronRight
            className={cn("w-4 h-4 transition-transform", open && "rotate-90")}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4">
        <Collections database={db.name} />
      </CollapsibleContent>
    </Collapsible>
  );
};
