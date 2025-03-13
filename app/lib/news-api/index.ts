import type {
  INewsApiResponse,
  INewsApiSourceParams,
  INewsApiSourcesResponse,
  INewsApiEverythingParams,
  INewsApiTopHeadlinesParams,
} from "./types";

// THIS IS A PATCH FOR THE NEWS API TO WORK ON REACT WEB
// THE WORK IS AN EXTENSION OF THE ts-newsapi PACKAGE
// https://www.npmjs.com/package/ts-newsapi?activeTab=readme

/**
 * Breaking news headlines, and search for articles from news sources and blogs all over the web
 */
export default class NewsAPI {
  private readonly _apiKey: string;
  private static _URL = "https://newsapi.org/v2";

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  /**
   * This endpoint provides live top and breaking headlines for a country,
   * specific category in a country, single source, or multiple sources.
   * You can also search with keywords.
   * Articles are sorted by the earliest date published first.
   * This endpoint is great for retrieving headlines for display on news tickers or similar.
   */
  async getTopHeadlines(
    params: INewsApiTopHeadlinesParams = {}
  ): Promise<INewsApiResponse> {
    const endpointUrl = `${NewsAPI._URL}/top-headlines`;

    if (params?.sources && params?.sources.length) {
      if (params.country)
        throw new Error("You can't mix 'country' with 'sources'.");
      if (params.category)
        throw new Error("You can't mix 'category' with 'sources'.");
    }

    const urlParams = this._constructParams(params);
    return this._fetchData(endpointUrl, urlParams);
  }

  /**
   * Search through millions of articles from over 50,000 large and small news sources and blogs.
   * This includes breaking news as well as lesser articles.
   * This endpoint suits article discovery and analysis,
   * but can be used to retrieve articles for display, too.
   */
  async getEverything(
    params: INewsApiEverythingParams = {}
  ): Promise<INewsApiResponse> {
    const endpointUrl = `${NewsAPI._URL}/everything`;
    const urlParams = this._constructParams(params);
    return this._fetchData(endpointUrl, urlParams);
  }

  /**
   * This endpoint returns the subset of news publishers that top headlines are available from.
   * It's mainly a convenience endpoint that you can use to keep track of the publishers available on the API,
   * and you can pipe it straight through to your users.
   */
  async getSources(
    params: INewsApiSourceParams = {}
  ): Promise<INewsApiSourcesResponse> {
    const endpointUrl = `${NewsAPI._URL}/sources`;
    const urlParams = this._constructParams(params);
    return this._fetchData(endpointUrl, urlParams);
  }

  _constructParams(params: INewsApiEverythingParams = {}): URLSearchParams {
    const urlParams = new URLSearchParams({ apiKey: this._apiKey });
    Object.keys(params).forEach((key) => {
      const typedKey = key as keyof INewsApiEverythingParams;

      if (Array.isArray(params[typedKey])) {
        urlParams.append(key, params[typedKey].join(","));
      } else if (params[typedKey]) {
        urlParams.append(key, params[typedKey] as string);
      }
    });
    return urlParams;
  }

  async _fetchData(url: string, params: URLSearchParams) {
    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error: any) {
      console.error("Error fetching data:", error);
      return { error: error.message };
    }
  }
}
