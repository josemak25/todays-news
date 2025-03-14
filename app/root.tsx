import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  isRouteErrorResponse,
} from "react-router";
import { NonceProvider, useNonce } from "usenonce";
import {
  Theme,
  useTheme,
  ThemeProvider,
  PreventFlashOnWrongTheme,
} from "remix-themes";

import type { Route } from "./+types/root";
import { Toaster } from "~/components/ui/sonner";
import { queryClient } from "~/lib/query-client";
import { themeSessionResolver } from "./sessions.server";
import { QueryClientProvider } from "@tanstack/react-query";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Return the theme from the session storage using the loader
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
};

export function HydrateFallback() {
  return (
    <main
      id="loading-splash"
      className="flex flex-col items-center justify-center w-screen h-screen gap-8"
    >
      <span className="relative flex size-10">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex size-10 rounded-full bg-primary"></span>
      </span>
      <p className="text-sm">Loading, please wait...</p>
    </main>
  );
}

// Use the theme in your app.
// If the theme is missing in session storage, PreventFlashOnWrongTheme will get
// the browser theme before hydration and will prevent a flash in browser.
// The client code runs conditionally, it won't be rendered if we have a theme in session storage.
function InnerLayout({
  ssrTheme,
  children,
}: {
  ssrTheme: boolean;
  children: React.ReactNode;
}) {
  const nonce = useNonce();
  const [theme] = useTheme();

  return (
    <html lang="en" data-theme={theme} className={theme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration nonce={nonce} />
        <PreventFlashOnWrongTheme ssrTheme={ssrTheme} nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");

  return (
    <ThemeProvider
      themeAction="/resources/set-theme"
      specifiedTheme={data?.theme as Theme}
    >
      <QueryClientProvider client={queryClient}>
        <NonceProvider>
          <InnerLayout ssrTheme={Boolean(data?.theme)}>
            {children}
            <Toaster />
          </InnerLayout>
        </NonceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
