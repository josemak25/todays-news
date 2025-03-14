import Guardian from "guardian-js";
import { toast } from "sonner";
import NewsAPI from "~/lib/news-api";

import {
  cleanQuery,
  formatNewsArticles,
  formatGuardianArticles,
} from "./utils";

const newsAPI = new NewsAPI(import.meta.env.VITE_NEWS_API_KEY);
const guardian = new Guardian(import.meta.env.VITE_GUARDIAN_API_KEY, false);
//TODO: Add 3RD API (NewsAPI)

export const getHeadlines = async () => {
  const response = await newsAPI.getTopHeadlines({
    page: 1,
    country: "us",
    pageSize: 10,
  });

  return formatNewsArticles(response.articles);
};

export const getNewsAPIArticles = async (params: SearchArticle) => {
  // remove empty values
  const query = cleanQuery({
    pageSize: 10,
    language: "en",
    to: params.end_date,
    sortBy: "relevancy",
    q: params.query || "",
    page: params?.page || 1,
    from: params.start_date,
    category: params.category,
    sources: ["bbc-news", "google-news", "al-jazeera-english"],
  });

  const response = await newsAPI.getEverything(query);

  if (response.error) {
    // TODO: report error to Sentry
    toast.error(response?.error || "Oops! Something went wrong");
  }

  // returning an empty array to prevent screen crashes on error
  // TODO: handle error properly and add error handling to the UI
  return formatNewsArticles(response?.articles || []);
};

export const getGuardianArticles = async (params: SearchArticle) => {
  // remove empty values
  const query = cleanQuery({
    tag: params.category,
    page: params.page || 1,
    "from-date": params.start_date,
  });

  try {
    const response = await guardian.content.search(params?.query || "", query);

    return formatGuardianArticles(response.results);
  } catch (error: any) {
    // TODO: report error to Sentry
    toast.error(error.message || "Oops! Something went wrong");

    // returning an empty array to prevent screen crashes on error
    // TODO: handle error properly and add error handling to the UI
    return [];
  }
};

export const searchArticles = async (query: SearchArticle) => {
  const newsSource = query.source
    ?.toUpperCase()
    .split(" ")
    .join("_") as NewsSource | null;

  let newsAPIArticles: Article[] = [];
  let guardianArticles: Article[] = [];

  switch (newsSource) {
    case "GUARDIAN":
      guardianArticles = await getGuardianArticles(query);
      break;

    case "NEWS_API":
      newsAPIArticles = await getNewsAPIArticles(query);
      break;

    default:
      newsAPIArticles = await getNewsAPIArticles(query);
      guardianArticles = await getGuardianArticles(query);
      break;
  }

  return newsAPIArticles.concat(guardianArticles);
};
