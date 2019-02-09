import * as React from "react";
import "./../assets/scss/App.scss";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { ICMCQuoteData } from "../redux/api-epics";
import {
  getQuotesForDropdown,
  getQuotesForTable,
  getTableSort
} from "../redux/selectors";
import * as actions from "../redux/actions";
import cx from "classnames";

export interface AppProps {
  quotesForTable: ICMCQuoteData[];
  quotesForDropdown: ICMCQuoteData[];
  tableSort: actions.ISort;
  addToTable: (id: number) => {};
  removeFromTable: (id: number) => {};
  sortTable: (
    column: actions.ISortColumn,
    direction: actions.ISortDirection
  ) => {};
}

const App: React.FunctionComponent<AppProps> = ({
  quotesForTable,
  quotesForDropdown,
  addToTable,
  removeFromTable,
  sortTable,
  tableSort
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={4}>
            <h1>React Blockchain</h1>
          </th>
        </tr>
        <tr>
          <th key="cmc_rank">
            CMC Rank {sortIcon(sortTable, tableSort, "cmc_rank")}
          </th>
          <th key="symbol">
            Symbol {sortIcon(sortTable, tableSort, "symbol")}
          </th>
          <th key="price">
            Price (USD) {sortIcon(sortTable, tableSort, "price")}
          </th>
          <th key="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {quotesForTable.map((q: ICMCQuoteData) => {
          return (
            <tr key={q.id}>
              <td>{q.cmc_rank}</td>
              <td>{q.symbol}</td>
              <td>${q.quote["USD"].price.toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromTable(q.id)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {quotesForDropdown.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan={4}>
              Add rows:{" "}
              <select
                onChange={e => {
                  const val = (e.target as HTMLSelectElement).value;
                  if (val && val !== "") addToTable(parseInt(val));
                }}
              >
                {quotesForDropdown.map((q: ICMCQuoteData) => (
                  <option key={q.id} value={q.id}>
                    {q.symbol}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
export default hot(
  connect(
    (state, ownProps) => ({
      quotesForTable: getQuotesForTable(state),
      quotesForDropdown: getQuotesForDropdown(state),
      tableSort: getTableSort(state)
    }),
    (dispatch, ownProps) => ({
      addToTable: (id: number) => dispatch(actions.addToTable(id)),
      removeFromTable: (id: number) => dispatch(actions.removeFromTable(id)),
      sortTable: (
        column: actions.ISortColumn,
        direction: actions.ISortDirection
      ) => dispatch(actions.sortTable(column, direction))
    })
  )(App)
);
function sortIcon(
  sortTable: (
    column: actions.ISortColumn,
    direction: actions.ISortDirection
  ) => {},
  tableSort: actions.ISort,
  currentColumn: actions.ISortColumn
) {
  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        sortTable(
          currentColumn,
          tableSort.column !== currentColumn || tableSort.direction === "desc"
            ? "asc"
            : "desc"
        );
      }}
      className={cx("sort", {
        selected: tableSort.column === currentColumn
      })}
    >
      {tableSort.column === currentColumn && tableSort.direction === "desc"
        ? "▼"
        : "▲"}
    </a>
  );
}
