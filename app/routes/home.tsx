import type { Route } from "./+types/home";
import { News } from "~/pages/news/news";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Today's News" },
    {
      name: "description",
      content:
        "Welcome to Today's News, where you can find the latest news from around the world.",
    },
  ];
}

export default function Home() {
  return <News />;
}
