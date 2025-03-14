import { remember } from "@epic-web/remember";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = remember(
  "react-query",
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes in milliseconds
        },
      },
    })
);
