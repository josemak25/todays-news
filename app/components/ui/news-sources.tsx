import { useLoaderData } from "react-router";

import { cn } from "~/lib/utils";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type NewsSourceProps = {
  selected?: string;
  applyBottomBorder?: boolean;
  onSelect: (select: string) => void;
};

export const NewsSources = ({
  selected,
  onSelect,
  applyBottomBorder = true,
}: NewsSourceProps) => {
  const { sources } = useLoaderData<ArticleLoaderData>();

  return (
    <ScrollArea
      aria-orientation="horizontal"
      className="w-full whitespace-nowrap"
    >
      <div className="flex w-max lg:space-x-2">
        {sources.map((source) => (
          <Button
            type="button"
            variant="ghost"
            key={source.name}
            onClick={() => onSelect(source.name)}
            className={cn(
              "flex-col h-full cursor-pointer hover:bg-transparent rounded-sm",
              applyBottomBorder && "border-b-2 border-b-transparent",
              applyBottomBorder && source.name === selected && "border-input"
            )}
          >
            <Avatar
              className={cn(
                "size-16 bg-slate-100 flex items-center justify-center p-2",
                source.name === selected && "bg-red-400"
              )}
            >
              <AvatarImage className="rounded-full" src={source.image} />
              <AvatarFallback className="uppercase">
                {source.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium mt-2">{source.name}</p>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" hidden />
    </ScrollArea>
  );
};
