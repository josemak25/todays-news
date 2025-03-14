import { Suspense } from "react";
import omit from "lodash.omit";
import { ArrowRight } from "lucide-react";
import { Link, useSubmit, useLoaderData } from "react-router";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { NewsSearch } from "./search";
import { useArticlesSearchParams } from "~/lib/hooks";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { NewsSources } from "~/components/ui/news-sources";
import { GuardianNews, NewsAPINews, HeadLineNews } from "./loaders";

export function News() {
  const submit = useSubmit();
  const params = useArticlesSearchParams();
  const data = useLoaderData<ArticleLoaderData>();

  return (
    <main className="flex flex-col h-screen">
      {/* START OF HEADER */}
      <header className="p-4 lg:px-0">
        {/* START OF MOBILE HEADER */}
        <div className="flex min-lg:hidden items-center justify-between">
          <h2 className="text-xl font-bold">Today News</h2>
          <div className="flex items-center space-x-4">
            <NewsSearch />
          </div>
        </div>
        {/* END OF MOBILE HEADER */}

        {/* START OF DESKTOP HEADER */}
        <div className="hidden min-lg:flex w-full justify-between p-10 xl:px-[15rem]">
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <NewsSearch />
          </div>

          <div className="text-center flex-1">
            <h2 className="text-xl font-bold">Today News</h2>
            <p className="text-gray-500 text-sm">
              Stay informed with today’s top stories.
            </p>
          </div>

          <div className="hidden md:flex">
            <Button
              variant="default"
              className="px-4 py-2 flex items-center space-x-2"
            >
              Subscribe <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <Separator className="hidden min-lg:flex  my-4 bg-border/70" />
        <div className="flex max-lg:hidden w-full justify-center items-center ">
          <div className="flex overflow-hidden px-10">
            <ScrollArea aria-orientation="horizontal" className="w-full ">
              <div className="flex w-max px-4 space-x-2">
                {data.categories.map((category) => (
                  <Button
                    type="submit"
                    key={category}
                    onClick={() =>
                      submit(
                        category === params?.category
                          ? omit(params, ["category"])
                          : { ...params, category },
                        { method: "GET" }
                      )
                    }
                    className={cn(
                      "cursor-pointer capitalize",
                      category !== params?.category && "text-gray-500"
                    )}
                    variant={
                      category === params?.category ? "default" : "ghost"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" hidden />
            </ScrollArea>
          </div>
        </div>
        <Separator className="hidden min-lg:flex  my-4 bg-border/70" />
        {/* END OF DESKTOP HEADER */}
      </header>
      {/* END OF HEADER */}

      {/* START OF MOBILE NEWS SOURCES */}
      <section className="lg:hidden py-4 ">
        <NewsSources
          applyBottomBorder={false}
          selected={params?.source}
          onSelect={(source) =>
            submit({ ...params, source }, { method: "GET" })
          }
        />
      </section>
      {/* END OF MOBILE NEWS SOURCES */}

      {/* START OF HEADLINE*/}
      <Suspense fallback={<div>Loading headline news...</div>}>
        <HeadLineNews />
      </Suspense>

      {/* END OF  HEADLINE*/}

      {/* START OF MOBILE CATEGORIES */}
      <section className="py-2 lg:hidden">
        <ScrollArea aria-orientation="horizontal" className="w-full ">
          <div className="flex w-max px-4 space-x-2">
            {data.categories.map((category) => (
              <Button
                key={category}
                onClick={() =>
                  submit(
                    category === params?.category
                      ? omit(params, ["category"])
                      : { ...params, category },
                    { method: "GET" }
                  )
                }
                className={cn(
                  "px-4 py-2 rounded-full capitalize",
                  category !== params?.category &&
                    "bg-primary/30 text-primary-foreground/80"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      {/* END OF MOBILE CATEGORIES */}

      {/* START OF DESKTOP NEWS SOURCES*/}
      <section className="hidden lg:flex w-[70%] self-center my-10">
        <ScrollArea
          aria-orientation="horizontal"
          className="w-full whitespace-nowrap"
        >
          <div className="flex items-center w-full gap-10 flex-wrap">
            {data.sources.map((source) => (
              <Link
                key={source.title}
                to={`?source=${source.name}`}
                className="flex flex-row max-w-[350px] gap-3 text-wrap p-1 border-none shadow-none cursor-pointer"
              >
                <Avatar
                  className={cn(
                    "size-14 bg-transparent flex items-center justify-center p-2",
                    source.name === params.source && "bg-red-400"
                  )}
                >
                  <AvatarImage className="rounded-full" src={source.image} />
                  <AvatarFallback className="text-[12px] uppercase">
                    {source.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-lg font-semibold line-clamp-3">
                    {source.title}
                  </h2>
                  <h2 className="text-sm font-light mt-5 line-clamp-4">
                    {source.description}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      {/* END OF DESKTOP NEWS SOURCES*/}

      {/* START OF RECOMMENDED */}
      <section className="w-full lg:w-[70%] lg:self-center p-5">
        <h2 className="text-l font-semibold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 flex-wrap">
          <Suspense fallback={<div>Loading guardian news...</div>}>
            <GuardianNews />
          </Suspense>

          <Suspense fallback={<div>Loading news api news...</div>}>
            <NewsAPINews />
          </Suspense>
        </div>
      </section>
      {/* END OF RECOMMENDED */}

      {/* START OF PAGINATION */}
      <div className="w-full flex py-10 items-center justify-center">
        <Button
          className="px-10 cursor-pointer"
          onClick={() => {
            // TODO: Add load more logic to infinite query so we can show or remove the button if hasMore is true|false
            submit(
              { ...params, page: Number(params?.page || 1) + 1 },
              { method: "GET" }
            );
          }}
        >
          Load More
        </Button>
      </div>
      {/* END OF PAGINATION */}
    </main>
  );
}
