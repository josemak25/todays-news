import { useState } from "react";
import { Search, Ellipsis } from "lucide-react";

import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
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
import React from "react";

const TEST_TABS = [
  "Politics",
  "Technology",
  "Education",
  "Science",
  "Sports",
  "Business",
];

const TEST_TRENDING = [
  {
    title: "CNN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
  {
    title: "BBC",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
  {
    title: "Al Jazeera",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
];

const RECOMMENDED_TRENDING = [
  {
    title: "CNN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
  {
    title: "BBC",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
  {
    title: "Al Jazeera",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia voluptas, doloremque, voluptate, molestias, quisquam",
    image: "https://i.ibb.co/4pSQJ06/apple-google.png",
  },
];

export function News() {
  const [tab, setTab] = useState(TEST_TABS[0]);
  const [visible, setVisible] = useState(false);

  return (
    <main className="flex flex-col h-screen">
      {/* START OF HEADER */}
      <header className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today New's</h2>
          <div className="flex items-center space-x-4">
            {visible ? (
              <Input
                type="text"
                inputMode="search"
                placeholder="Search"
                onSubmit={() => setVisible(!visible)}
                className="px-4 py-2 rounded-full text-xs"
              />
            ) : (
              <Button
                variant="outline"
                className="rounded-full size-10"
                onClick={() => setVisible(!visible)}
              >
                <Search className="size-5 opacity-50" />
              </Button>
            )}
          </div>
        </div>
      </header>
      {/* END OF HEADER */}

      {/* START OF RESOURCES LIST */}
      <section className="py-4">
        <ScrollArea
          aria-orientation="horizontal"
          className="w-full whitespace-nowrap"
        >
          <div className="flex w-max px-4 space-x-2">
            {[...Array(8)].map((_, index) => (
              <Avatar
                key={index}
                className="size-16 bg-slate-200 flex items-center justify-center p-2"
              >
                <AvatarImage
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      {/* END OF RESOURCES LIST */}

      {/* START OF TRENDING NOW */}
      <section className="py-4">
        <h2 className="px-4 text-l font-semibold mb-4">Trending Now</h2>

        <ScrollArea
          aria-orientation="horizontal"
          className="w-full whitespace-nowrap"
        >
          <div className="flex space-x-2 px-4">
            {TEST_TRENDING.map((feed) => (
              <Card className="min-w-full h-[300px] p-0 rounded-2xl overflow-hidden relative">
                <CardContent className="h-full p-0">
                  <img
                    src={feed.image}
                    className="w-full h-full object-cover"
                  />
                </CardContent>

                {/* Gradient overlay */}
                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <CardFooter className="flex-col absolute bottom-0 p-4 space-y-5 w-full items-start">
                  <CardTitle className="text-xl text-white text-wrap text-ellipsis line-clamp-2">
                    {feed.description}
                  </CardTitle>

                  <div className="flex items-center space-x-2">
                    <Avatar className="size-8">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                      />
                    </Avatar>
                    <CardDescription className="text-sm text-white">
                      {feed.title} News • Today
                    </CardDescription>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      {/* END OF TRENDING NOW */}

      {/* START OF TABS */}
      <section className="py-2">
        <ScrollArea aria-orientation="horizontal" className="w-full ">
          <div className="flex w-max px-4 space-x-2">
            {TEST_TABS.map((t) => (
              <Button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2 rounded-full",
                  tab !== t ? "bg-primary/30 text-primary-foreground/80" : ""
                )}
              >
                {t}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      {/* END OF TABS */}

      {/* START OF RECOMMENDED */}
      <section className="p-4">
        <h2 className="text-l font-semibold mb-4">Recommended</h2>

        {RECOMMENDED_TRENDING.map((feed, index) => (
          <React.Fragment key={feed.title}>
            <Card className="min-w-full h-[150px] p-0 rounded-none flex-row border-0 shadow-none gap-5 border-foreground/5">
              <CardHeader className="w-[33%] h-full p-0 rounded-xs overflow-hidden">
                <img className="flex-1 object-fill" src={feed.image} />
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs font-semibold underline text-foreground">
                    Business
                  </CardDescription>

                  <Ellipsis size={20} />
                </div>

                <CardTitle className="text-lg text-foreground text-wrap text-ellipsis line-clamp-3">
                  {feed.description}
                </CardTitle>

                <CardDescription className="text-xs font-semibold text-foreground/40">
                  Antonio Botosh • Dec, 11 2025
                </CardDescription>
              </CardContent>
            </Card>

            {index !== RECOMMENDED_TRENDING.length - 1 && (
              <Separator className="my-4 h-[2px] bg-border/70" />
            )}
          </React.Fragment>
        ))}
      </section>
      {/* END OF RECOMMENDED */}
    </main>
  );
}
