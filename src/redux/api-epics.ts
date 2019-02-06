export interface ICMCMapRequest {
  /* string - Only active coins are returned by default. Pass 'inactive' to get a list of coins that are no longer active. */
  listing_status?: "active" | "inactive";
  /* integer >1 - Optionally offset the start (1-based index) of the paginated list of items to return. */
  start?: number;
  /* integer [ 1 .. 5000 ] - Optionally specify the number of results to return. Use this parameter and the "start" parameter to determine your own pagination size. */
  limit?: number;
  /* string - Optionally pass a comma-separated list of cryptocurrency symbols to return CoinMarketCap IDs for. If this option is passed, other options will be ignored. */
  symbol?: string;
}

export interface ICMCMapData {
  /* integer - The unique CoinMarketCap ID for this cryptocurrency */
  id: number;
  /* string - The name of this cryptocurrency. */
  name: string;
  /* string - The ticker symbol for this cryptocurrency, always in all caps. */
  symbol: string;
  /* string - The web URL friendly shorthand version of this cryptocurrency name. */
  slug: string;
  /* 0 | 1 - 1 if this cryptocurrency is still being actively tracked and updated, otherwise 0. */
  is_active: 0 | 1;
  /* string - Timestamp (ISO 8601) of the date this cryptocurrency was first available on the platform. */
  first_historical_data: string;
  /* string - Timestamp (ISO 8601) of the last time this cryptocurrency's market data was updated. */
  last_historical_data: string;
  /* Metadata about the parent cryptocurrency platform this cryptocurrency belongs to if it is a token, otherwise null. */
  platform: any;
}
export interface ICMCQuoteRequest {
  /* string - One or more comma-separated cryptocurrency CoinMarketCap IDs. Example: 1,2 */
  id?: string;
  /* string - Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH". At least one "id" or "symbol" is required. */
  symbol?: string;
  /* string (default: "USD") - Optionally calculate market quotes in up to 40 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols. Each additional convert option beyond the first requires an additional call credit. A list of supported fiat options can be found [here](https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions). Each conversion is returned in its own "quote" object. */
  convert?: string;
}
export interface ICMCQuoteData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  date_added: string;
  num_market_pairs: number;
  tags: string[];
  cmc_rank: number;
  last_updated: string;
  quote: {
    string: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      last_updated: string;
    };
  };
}

export interface ICMCStatus {
  /* the current time on the server when the call was executed */
  timestamp: string;
  /* Standard HTTP Error Codes:
   * 0 if successful
   * 400 (Bad Request) The server could not process the request, likely due to an invalid argument.
   * 401 (Unauthorized) Your request lacks valid authentication credentials, likely an issue with your API Key.
   * 402 (Payment Required) Your API request was rejected due to it being a paid subscription plan with an overdue balance. Pay the balance in the Developer Portal billing tab and it will be enabled.
   * 403 (Forbidden) Your request was rejected due to a permission issue, likely a restriction on the API Key's associated service plan. Here is a convenient map of service plans to endpoints.
   * 429 (Too Many Requests) The API Key's rate limit was exceeded; consider slowing down your API Request frequency if this is an HTTP request throttling error. Consider upgrading your service plan if you have reached your monthly API call credit limit for the day/month.
   * 500 (Internal Server Error) An unexpected server issue was encountered.
   */
  error_code: number;
  /* Error message param
   * null if successful
   */
  error_message: string | null;
  elapsed: number;
  credit_count: number;
}
