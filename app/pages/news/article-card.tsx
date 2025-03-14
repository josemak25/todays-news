import { Link } from "react-router";
import { Ellipsis } from "lucide-react";

import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "~/components/ui/card";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={article.url} target="_blank" key={article.id}>
      <Card className=" max-w-[375px] h-[150px] p-0 rounded-none flex-row border-0 shadow-none gap-5 border-foreground/5">
        <CardHeader className="w-[33%] h-full p-0 rounded-xs overflow-hidden">
          <img
            className="flex-1 object-cover min-w-[150px]"
            src={article.image}
          />
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs font-semibold underline text-foreground">
              {article.source}
            </CardDescription>

            <Ellipsis size={20} />
          </div>

          <CardTitle className="text-lg text-foreground text-wrap text-ellipsis line-clamp-3">
            {article.description}
          </CardTitle>

          <CardDescription className="text-xs font-semibold text-foreground/40">
            {article.tag}• {article.publishedAt}
          </CardDescription>
        </CardContent>
      </Card>

      <Separator className="my-4 h-[2px] max-w-[375px]  bg-border/70" />
    </Link>
  );
}
