import { toast } from "sonner";
import Guardian from "guardian-js";
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
  let result: NewsResults = { data: [], totalResults: 0 };

  try {
    const response = await newsAPI.getTopHeadlines({
      page: 1,
      country: "us",
      pageSize: 10,
    });

    result = {
      totalResults: response.totalResults,
      data: formatNewsArticles(response?.articles || []),
    };
  } catch (error: any) {
    toast.error(error.message);
  }

  return result;
};

export const getNewsAPIArticles = async (params: SearchArticle) => {
  let result: NewsResults = { data: [], totalResults: 0 };

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

  try {
    const response = await newsAPI.getEverything(query);

    result = {
      totalResults: response.totalResults,
      data: formatNewsArticles(response?.articles || []),
    };
  } catch (error: any) {
    toast.error(error.message);
  }

  return result;
};

export const getGuardianArticles = async (params: SearchArticle) => {
  let result: NewsResults = { data: [], totalResults: 0 };

  // remove empty values
  const query = cleanQuery({
    tag: params.category,
    page: params.page || 1,
    "from-date": params.start_date,
  });

  try {
    const response = await guardian.content.search(params?.query || "", query);

    result = {
      totalResults: response.pages as number,
      data: formatGuardianArticles(response.results),
    };
  } catch (error: any) {
    toast.error(error.message);
  }

  return result;
};
