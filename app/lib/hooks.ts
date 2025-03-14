import { useSearchParams } from "react-router";
import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { getHeadlines, getNewsAPIArticles, getGuardianArticles } from "./api";

export const useArticlesSearchParams = () => {
  const [params] = useSearchParams();
  const queryParams: SearchArticle = Object.fromEntries(params.entries());
  return queryParams;
};

/* ************************************************************************************** *
 * ******************************                           ***************************** *
 * ******************************         REACT QUERIES     ***************************** *
 * ******************************                           ***************************** *
 * ************************************************************************************** */

export const getHeadlinesQueryKey = ["headlines"];

export const useHeadlinesQuery = () => {
  return useSuspenseQuery({
    queryKey: getHeadlinesQueryKey,

    queryFn: async () => {
      const { data } = await getHeadlines();
      return data;
    },
  });
};

export const searchArticlesQueryKey = (
  query: SearchArticle,
  source: NewsSource
) => [`search-${source}-articles`, Object.values(query).join("-")];

export const useSearchNewsAPIArticlesQuery = () => {
  const query = useArticlesSearchParams();

  return useSuspenseInfiniteQuery({
    initialPageParam: { page: 1 },

    queryKey: searchArticlesQueryKey(query, "NEWS_API"),

    queryFn: ({ pageParam }) => getNewsAPIArticles({ ...pageParam, ...query }),

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPagesLength = allPages.flatMap((page) => page.data).length;

      if (lastPage.totalResults > totalPagesLength) {
        return { page: lastPageParam.page + 1 };
      }
    },

    select: (data) => {
      const pages = data.pages.flatMap((page) => page.data);
      return { ...data, pages };
    },
  });
};

export const useSearchGuardianArticlesQuery = () => {
  const query = useArticlesSearchParams();

  return useSuspenseInfiniteQuery({
    initialPageParam: { page: 1 },

    queryKey: searchArticlesQueryKey(query, "GUARDIAN"),

    queryFn: ({ pageParam }) => getGuardianArticles({ ...pageParam, ...query }),

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPagesLength = allPages.flatMap((page) => page.data).length;

      if (lastPage.pages > totalPagesLength) {
        return { page: lastPageParam.page + 1 };
      }
    },

    select: (data) => {
      const pages = data.pages.flatMap((page) => page.data);
      return { ...data, pages };
    },
  });
};
