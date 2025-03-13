import type { Route } from "./+types/home";
import NewsSlug from "~/pages/news-slug";

export function meta(args: Route.MetaArgs) {
  return [
    { title: args.params.slug },
    {
      name: args.params.slug,
      content:
        "Welcome to Today's News, where you can find the latest news from around the world.",
    },
  ];
}

export default function NewsDetail() {
  return <NewsSlug />;
}
