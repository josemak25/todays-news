type Article = {
  id: string;
  url: string;
  tag: string;
  title: string;
  image: string;
  source: string;
  publishedAt: string;
  author: string | null;
  description: string | null;
};

type NewsSource = "GUARDIAN" | "NEWS_API";

type NewsSourceDetails = {
  name: string;
  image: string;
  title: string;
  description: string;
};

type ArticleLoaderData<T = any> = {
  articles: Article[];
  headlines: Article[];
  categories: string[];
  sources: NewsSourceDetails[];
};

type SearchArticle = {
  page?: number;
  query?: string;
  source?: string;
  end_date?: string;
  category?: string;
  start_date?: string;
};

type NewsResults = {
  data: Article[];
  totalResults: number;
};
