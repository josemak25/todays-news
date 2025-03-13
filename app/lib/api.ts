import Guardian from "guardian-js";
import { format } from "date-fns";
import NewsAPI from "~/lib/news-api";

import { formatNewsAPI, NEWS_SOURCE_DETAILS } from "./utils";

const newsAPI = new NewsAPI(import.meta.env.VITE_NEWS_API_KEY);
const guardian = new Guardian(import.meta.env.VITE_GUARDIAN_API_KEY, false);
// last api package

export const getHeadlines = async () => {
  const response = await newsAPI.getTopHeadlines({
    page: 1,
    country: "us",
    pageSize: 10,
  });

  return formatNewsAPI(response);
};

export const getNewsAPIArticles = async (page: number) => {
  const response = await newsAPI.getEverything({
    page,
    pageSize: 10,
    language: "en",
    sortBy: "relevancy",
    // sources: ["bbc-news", "google-news", "al-jazeera-english"],
  });

  return formatNewsAPI(response);
};

export const getGuardianArticles = async (page: number) => {
  const response = await guardian.content.search("", { page });
  const formattedArticles: Article[] = response.results.map((article: any) => ({
    source: "GUARDIAN",
    url: article.webUrl,
    author: article.byline,
    title: article.webTitle,
    tag: article.sectionName,
    description: article.webTitle,
    image: article.image || NEWS_SOURCE_DETAILS["GUARDIAN"].image,
    publishedAt: format(new Date(article.webPublicationDate), "MMM, dd yyyy"),
  }));

  return formattedArticles;
};

export const getAllArticles = async (page = 1) => {
  const newsAPIArticles = await getNewsAPIArticles(page);
  const guardianArticles = await getGuardianArticles(page);
  return newsAPIArticles.concat(guardianArticles);
};

export const searchArticles = async () => {
  // Make a request to the NewsAPI API
  // Make a request to the Guardian API
};

export const fetchNextPage = async (page = 1) => {
  getAllArticles(page);
};
