import { Link } from "react-router";
import { Card } from "~/components/ui/card";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Link2,
  Heart,
  ChevronLeft,
  EllipsisVertical,
  MessageSquareMore,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export default function NewsSlug() {
  return (
    <>
      <main className="flex flex-col h-screen">
        <header className="p-5 pt-6 sticky bg-background top-0">
          <div className="flex min-md:hidden w-full justify-between">
            <div className="flex items-center justify-between w-full">
              <Link
                to="/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full size-10"
                )}
              >
                <ChevronLeft className="size-5 " />
              </Link>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="rounded-full size-10">
                  <Link2 className="size-5 " />
                </Button>
                <Button variant="outline" className="rounded-full size-10">
                  <EllipsisVertical className="size-5 " />
                </Button>
              </div>
            </div>
          </div>
          <Breadcrumb className="hidden min-md:block py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex justify-center">
          <Card className="w-full rounded-lg shadow-none border-none p-4 gap-2 max-w-[720px] ">
            <h2 className="text-2xl min-[470px]:text-3xl min-[720px]:text-5xl min-[720px]:mt-10 font-semibold min-[720px]:font-bold pb-0">
              Rumors of Brazil national team, Ancelotti: Contract until 2024
            </h2>

            <div className="hidden min-[720px]:flex items-center justify-between my-8">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src="/profile.jpeg"
                    alt="Alexander Mich"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alexander Mich</p>
                  <p className="text-md text-gray-500">
                    Published in Javarevisited · 6 min read · 5 days ago
                  </p>
                </div>
              </div>
            </div>

            <div className="block text-md mb-2 mt-0 text-gray-400 min-[720px]:hidden">
              Detik News • 18 Hours ago
            </div>

            <img
              src="/news.jpeg"
              alt="Carlo Ancelotti"
              className="w-full rounded-2xl min-[720px]:rounded-none min-[720px]:mb-10 my-2"
            />

            <div className="flex min-[720px]:hidden items-center justify-between my-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src="/profile.jpeg"
                    alt="Alexander Mich"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alexander Mich</p>
                  <p className="text-xs text-gray-500">2.1k Followers</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm min-md:text-lg ">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p className="mt-2 text-sm min-md:text-lg ">
              Why do we use it? It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </p>

            <p className="mt-2 text-sm min-md:text-lg ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Sed auctor nunc vitae erat pellentesque, a dictum erat
              dignissim.
            </p>

            <p className="mt-2 text-sm min-md:text-lg ">
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
            </p>

            <p className="mt-2 text-sm min-md:text-lg ">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Suspendisse potenti. Aenean
              euismod justo at elit accumsan, at dictum libero hendrerit.
            </p>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full px-4 py-2 flex items-center space-x-4 shadow-lg">
              <button className="flex items-center cursor-pointer space-x-1">
                <Heart className="w-5 h-5" />
              </button>
              <span className="h-6 w-px bg-white"></span>
              <button className="flex items-center cursor-pointer space-x-1">
                <MessageSquareMore className="w-5 h-5" />
                <span>1.2k</span>
              </button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
