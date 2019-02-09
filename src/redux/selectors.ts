import { IState } from "./reducers";

export const getQuotes = (state: IState) => state.cmcQuotes;
export const getQuotesForTable = (state: IState) =>
  getQuotes(state)
    .filter(x => state.shownInTable.includes(x.id))
    .sort((a, b) => {
      if (state.tableSort === null) {
        return 0;
      }
      if (state.tableSort.direction === "desc") {
        const tmp = b;
        b = a;
        a = tmp;
      }
      const column = state.tableSort.column;
      const getVal = a =>
        column === "price" ? a.quote["USD"].price : a[column];
      const aVal = getVal(a);
      const bVal = getVal(b);
      if (typeof aVal === "string") {
        return aVal.localeCompare(bVal);
      }
      return aVal - bVal;
    });
export const getQuotesForDropdown = (state: IState) => {
  const quotesForDropdown = getQuotes(state)
    .filter(x => !state.shownInTable.includes(x.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  return quotesForDropdown.length > 0
    ? [{ id: "", symbol: "(Select)" }, ...quotesForDropdown]
    : [];
};
export const getTableSort = (state: IState) => state.tableSort;
