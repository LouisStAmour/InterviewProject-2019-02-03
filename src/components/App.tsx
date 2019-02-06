import * as React from "react";
import "./../assets/scss/App.scss";
import quotes from "../../tests/__fixtures__/quotes_latest";
import { ICMCQuoteData } from "../redux/api-epics";

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const quoteData = Object.values(quotes.data) as ICMCQuoteData[];
  const selected = quoteData.slice(5);
  const selectedIds = selected.map((s: ICMCQuoteData) => s.id);
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
        {selected.map((q: ICMCQuoteData) => {
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
              {quoteData.map((q: ICMCQuoteData) => {
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
};
export default App;
