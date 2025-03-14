import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar1 } from "lucide-react";

import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";

export function DesktopHeadlines({
  headlines,
}: Pick<ArticleLoaderData, "headlines">) {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const article = headlines[current];

  if (!article) {
    return null;
  }

  return (
    <section className="hidden lg:flex h-dvh  w-full p-4 flex-row mt-10 justify-center">
      <div className="flex self-end flex-[0.7]">
        <div className="p-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Calendar1 className="size-4" />
            <span> {article.publishedAt}</span>
          </div>

          <h1 className="mt-2 text-4xl md:text-6xl font-serif font-bold">
            {article.tag}
          </h1>

          <p className="mt-2 text-xl md:text-2xl text-gray-700 line-clamp-2">
            {article.title}
          </p>

          <p className="mt-4 text-gray-500 text-lg line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>

      <Carousel setApi={setApi} className="w-full xl:max-w-2xl lg:max-w-xs">
        <CarouselContent>
          {headlines.map((headline) => (
            <CarouselItem key={headline.id}>
              <Link
                className="p-4"
                to={headline.url}
                target="_blank"
                key={headline.title}
              >
                <Card className="p-0 rounded-2xl overflow-hidden">
                  <CardContent className="flex h-full w-full p-0 aspect-square items-center justify-center">
                    <img
                      src={headline.image}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="size-15 cursor-pointer" />
        <CarouselNext className="size-15 cursor-pointer" />
      </Carousel>
    </section>
  );
}

export function MobileHeadlines({
  headlines,
}: Pick<ArticleLoaderData, "headlines">) {
  return (
    <section className="py-4 block lg:hidden">
      <h2 className="px-4 text-l font-semibold mb-4">Headlines</h2>

      <ScrollArea
        aria-orientation="horizontal"
        className="w-full whitespace-nowrap"
      >
        <div className="flex space-x-2 px-4">
          {headlines.map((headline) => (
            <Link to={headline.url} target="_blank" key={headline.id}>
              <Card className=" min-w-[300px] h-[300px] p-0 rounded-2xl overflow-hidden relative">
                <CardContent className="h-full p-0">
                  <img
                    src={headline.image}
                    className="w-full h-full object-cover"
                  />
                </CardContent>

                {/* Gradient overlay */}
                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <CardFooter className="flex-col absolute bottom-0 p-4 space-y-5 w-full items-start">
                  <CardTitle className="text-xl text-white text-wrap  line-clamp-2">
                    {headline.title}
                  </CardTitle>

                  <div className="flex items-center space-x-2">
                    <Avatar className="size-8">
                      <AvatarImage
                        className="rounded-full"
                        src={headline.image}
                      />
                    </Avatar>
                    <CardDescription className="text-sm text-white">
                      {headline.source} • {headline.publishedAt}
                    </CardDescription>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
    </section>
  );
}
