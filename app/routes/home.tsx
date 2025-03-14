import { News } from "~/pages/news/news";
import type { Route } from "./+types/home";
import { getArticlesCategories, getNewsSources } from "~/lib/utils";

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

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const sources = getNewsSources();
  const categories = getArticlesCategories();

  return { sources, categories };
}

export default function Home() {
  return <News />;
}
