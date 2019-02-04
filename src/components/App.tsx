import * as React from "react";
import "./../assets/scss/App.scss";
import quotes from "../../tests/__fixtures__/quotes_latest";

const reactLogo = require("./../assets/img/react_logo.svg");

export interface AppProps {}

export interface QuoteData {
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

export default class App extends React.Component<AppProps, undefined> {
  render() {
    const selected = Object.values(quotes.data).slice(5);
    const selectedIds = selected.map((s: QuoteData) => s.id);
    return (
      <table>
        <thead>
          <tr>
            <th colSpan={4}>
              <h1>React Blockchain</h1>
            </th>
          </tr>
          <tr>
            <th>CMC rank</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selected.map((q: QuoteData) => {
            return (
              <tr key={q.id}>
                <td>{q.cmc_rank}</td>
                <td>{q.symbol}</td>
                <td>${q.quote["USD"].price.toFixed(2)}</td>
                <td>
                  <button>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              Add rows:{" "}
              <select>
                {Object.values(quotes.data).map((q: QuoteData) => {
                  return selectedIds.includes(q.id) ? null : (
                    <option key={q.id} value={q.id}>
                      {q.symbol}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}
