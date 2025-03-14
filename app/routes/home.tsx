import type { Route } from "./+types/home";
import { News } from "~/pages/news/news";
import { getHeadlines, searchArticles } from "~/lib/api";
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query: SearchArticle = Object.fromEntries(url.searchParams.entries());

  const headlines = await getHeadlines();
  const articles = await searchArticles(query);

  const sources = getNewsSources();
  const categories = getArticlesCategories();

  return {
    sources,
    articles,
    headlines,
    categories,
  };
}

export default function Home() {
  return <News />;
}
