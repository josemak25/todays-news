import { ArticleCard } from "./article-card";
import { DesktopHeadlines, MobileHeadlines } from "./headlines";
import {
  useHeadlinesQuery,
  useSearchNewsAPIArticlesQuery,
  useSearchGuardianArticlesQuery,
} from "~/lib/hooks";

export function HeadLineNews() {
  const { data: articles } = useHeadlinesQuery();

  if (!articles.length) {
    return <h2 className="px-4 text-l font-semibold mb-4">No Headlines!</h2>;
  }

  return (
    <>
      <MobileHeadlines headlines={articles} />
      <DesktopHeadlines headlines={articles} />
    </>
  );
}

export function GuardianNews() {
  const { data } = useSearchGuardianArticlesQuery();
  return data.pages.map((article) => <ArticleCard article={article} />);
}

export function NewsAPINews() {
  const { data } = useSearchNewsAPIArticlesQuery();
  return data.pages.map((article) => <ArticleCard article={article} />);
}
