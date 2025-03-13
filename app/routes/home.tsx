import type { Route } from "./+types/home";
import { News } from "~/pages/news/news";
import { getHeadlines } from "~/lib/api";
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
  // const articles = await getAllArticles();
  // const headlines = await getHeadlines();

  const sources = getNewsSources();
  const categories = getArticlesCategories();

  return {
    sources,
    categories,
    articles: [],
    headlines: [],
  };
}

export async function clientAction({ params }: Route.ClientActionArgs) {
  console.log(params);
}

export default function Home() {
  return <News />;
}
