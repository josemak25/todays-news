import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";

import type { ApiNewsCategory, INewsApiResponse } from "./news-api/types";

export const NEWS_SOURCE_DETAILS: Record<NewsSource, NewsSourceDetails> = {
  GUARDIAN: {
    name: "Guardian",
    image:
      "https://assets-legacy.floridarrc.com/2023/01/guardian-logo-square.jpg",
    title:
      "The Guardian - Independent News, In-Depth Journalism & Global Coverage",
    description:
      "Latest breaking news, analysis, and opinion on global events, politics, business, culture, and more from The Guardian.",
  },
  NEWS_API: {
    name: "News API",
    title: "NewsAPI - Global News Aggregator for Breaking Stories & Headlines",
    description:
      "NewsAPI delivers the latest breaking news, headlines, and articles from top news sources worldwide, covering politics, business, technology, sports, and more.",
    image:
      "https://i0.wp.com/newsdata.io/blog/wp-content/uploads/2024/01/Snipaste_2021-11-28_13-55-49.jpg?fit=701%2C351&ssl=1",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getArticlesCategories = (): ApiNewsCategory[] => {
  const categories: ApiNewsCategory[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return categories;
};

export const formatNewsDate = (date: string) => {
  return format(new Date(date), "MMM, dd yyyy");
};

export const cleanQuery = (query: object) => omitBy(query, isEmpty);

export const getNewsSources = () => Object.values(NEWS_SOURCE_DETAILS);

/**
 *
 * @description A function that helps generate unique id
 * @function uuidv4
 * @returns string
 */
export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === "x" ? random : (random % 4) + 8;
    return value.toString(16);
  });
};

export const formatNewsArticles = (response: INewsApiResponse["articles"]) => {
  const formattedArticles: Article[] = response.map((article) => ({
    id: uuidv4(), // API does not provide an id, so we generate one
    url: article.url,
    title: article.title,
    author: article.author,
    tag: article.source.name,
    description: article.description,
    source: NEWS_SOURCE_DETAILS["NEWS_API"].name,
    publishedAt: formatNewsDate(article.publishedAt),
    image: article.urlToImage || NEWS_SOURCE_DETAILS["NEWS_API"].image,
  }));

  return formattedArticles;
};

export const formatGuardianArticles = (response: any[]) => {
  const formattedArticles: Article[] = response.map((article) => ({
    id: article.id,
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
