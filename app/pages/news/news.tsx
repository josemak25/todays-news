import { Link, useFetcher, useLoaderData } from "react-router";
import { Ellipsis, ArrowRight } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardHeader,
  CardDescription,
} from "~/components/ui/card";

import { NewsSearch } from "./search";
import { Headlines } from "./headlines";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { NewsSources } from "~/components/ui/news-sources";

export function News() {
  const fetcher = useFetcher();
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
            <Button variant="outline" className="rounded-2xl size-10">
              <ModeToggle />
            </Button>
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
                    key={category}
                    variant="ghost"
                    className={cn(
                      "bg-transparent text-gray-500 cursor-pointer hover:bg-transparent border-none capitalize"
                    )}
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
        <NewsSources selected="" onSelect={() => {}} />
      </section>
      {/* END OF MOBILE NEWS SOURCES */}

      {/* START OF MOBILE HEADLINES */}
      <section className="py-4 block lg:hidden">
        <h2 className="px-4 text-l font-semibold mb-4">Headlines</h2>

        <ScrollArea
          aria-orientation="horizontal"
          className="w-full whitespace-nowrap"
        >
          <div className="flex space-x-2 px-4">
            {data.headlines.map((headline) => (
              <Link to={headline.url} target="_blank" key={headline.title}>
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
      {/* END OF MOBILE HEADLINES*/}

      {/* START OF DESKTOP HEADLINE*/}
      <Headlines headlines={data.headlines} />
      {/* END OF DESKTOP HEADLINE*/}

      {/* START OF MOBILE CATEGORIES */}
      <section className="py-2 lg:hidden">
        <ScrollArea aria-orientation="horizontal" className="w-full ">
          <div className="flex w-max px-4 space-x-2">
            {data.categories.map((category) => (
              <Button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full"
                  // tab !== t ? "bg-primary/30 text-primary-foreground/80" : ""
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
      <section className="hidden lg:flex w-[70%] self-center h-dvh my-10">
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
                {/* Logo */}
                <Avatar className="flex size-14 items-center justify-center p-2">
                  <AvatarImage className="rounded-full" src={source.image} />
                  <AvatarFallback className="text-[12px] uppercase">
                    {source.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {/* Text Content */}
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
          {data.articles?.map((article) => (
            <Link to={article.url} target="_blank" key={article.title}>
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
          ))}
        </div>
      </section>
      {/* END OF RECOMMENDED */}

      {/* START OF PAGINATION */}
      <fetcher.Form
        method="get"
        className="w-full flex py-10 items-center justify-center"
      >
        <Button className="px-10 cursor-pointer" type="submit">
          {fetcher.state === "loading" ? "Loading..." : "Load More"}
        </Button>
      </fetcher.Form>
      {/* END OF PAGINATION */}
    </main>
  );
}
