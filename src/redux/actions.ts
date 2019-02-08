import * as api from "./api-epics";
import { Action } from "redux";

export class Types {
  public static readonly CMC_ID_FETCH = "CMC_ID_FETCH";
  public static readonly CMC_ID_FETCH_SUCCEEDED = "CMC_ID_FETCH_SUCCEEDED";
  public static readonly CMC_ID_FETCH_FAILED = "CMC_ID_FETCH_FAILED";
  public static readonly CMC_QUOTES_FETCH = "CMC_QUOTES_FETCH";
  public static readonly CMC_QUOTES_FETCH_SUCCEEDED =
    "CMC_QUOTES_FETCH_SUCCEEDED";
  public static readonly CMC_QUOTES_FETCH_FAILED = "CMC_QUOTES_FETCH_FAILED";
  public static readonly ADD_TO_TABLE = "ADD_TO_TABLE";
  public static readonly REMOVE_FROM_TABLE = "REMOVE_FROM_TABLE";
  public static readonly SORT_TABLE = "SORT_TABLE";
}

export type IAction =
  | ICMCIDFetch
  | ICMCIDFetchSucceeded
  | ICMCIDFetchFailed
  | ICMCQuotesFetch
  | ICMCQuotesFetchSucceeded
  | ICMCQuotesFetchFailed
  | IAddToTable
  | IRemoveFromTable
  | ISortTable;

export interface ICMCIDFetch extends Action<typeof Types.CMC_ID_FETCH> {
  limit: number;
}
export interface ICMCIDFetchSucceeded
  extends Action<typeof Types.CMC_ID_FETCH_SUCCEEDED> {
  ids: number[];
}
export interface ICMCIDFetchFailed
  extends Action<typeof Types.CMC_ID_FETCH_FAILED> {
  action: ICMCIDFetch;
  status: api.ICMCStatus;
}
export interface ICMCQuotesFetch extends Action<typeof Types.CMC_QUOTES_FETCH> {
  ids: number[];
}
export interface ICMCQuotesFetchSucceeded
  extends Action<typeof Types.CMC_QUOTES_FETCH_SUCCEEDED> {
  quotes: api.ICMCQuoteData[];
}
export interface ICMCQuotesFetchFailed
  extends Action<typeof Types.CMC_QUOTES_FETCH_FAILED> {
  action: ICMCQuotesFetch;
  status: api.ICMCStatus;
}
export interface IAddToTable extends Action<typeof Types.ADD_TO_TABLE> {
  id: number;
}
export interface IRemoveFromTable
  extends Action<typeof Types.REMOVE_FROM_TABLE> {
  id: number;
}
export type ISortColumn = "cmc_rank" | "symbol" | "price";
export type ISortDirection = "asc" | "desc";
export type ISort = {
  column: ISortColumn;
  direction: ISortDirection;
};
export interface ISortTable extends Action<typeof Types.SORT_TABLE>, ISort {}

export const cmcIdFetch = (limit: number): ICMCIDFetch => ({
  type: Types.CMC_ID_FETCH,
  limit
});
export const cmcIdFetchSucceeded = (ids: number[]): ICMCIDFetchSucceeded => ({
  type: Types.CMC_ID_FETCH_SUCCEEDED,
  ids
});
export const cmcIdFetchFailed = (
  action: ICMCIDFetch,
  status: api.ICMCStatus
): ICMCIDFetchFailed => ({
  type: Types.CMC_ID_FETCH_FAILED,
  status,
  action
});
export const cmcQuotesFetch = (ids: number[]): ICMCQuotesFetch => ({
  type: Types.CMC_QUOTES_FETCH,
  ids
});
export const cmcQuotesFetchSucceeded = (
  quotes: api.ICMCQuoteData[]
): ICMCQuotesFetchSucceeded => ({
  type: Types.CMC_QUOTES_FETCH_SUCCEEDED,
  quotes
});
export const cmcQuotesFetchFailed = (
  action: ICMCQuotesFetch,
  status: api.ICMCStatus
): ICMCQuotesFetchFailed => ({
  type: Types.CMC_QUOTES_FETCH_FAILED,
  status,
  action
});
export const addToTable = (id: number): IAddToTable => ({
  type: Types.ADD_TO_TABLE,
  id
});
export const removeFromTable = (id: number): IRemoveFromTable => ({
  type: Types.REMOVE_FROM_TABLE,
  id
});
export const sortTable = (
  column: ISortColumn,
  direction: ISortDirection
): ISortTable => ({ type: Types.SORT_TABLE, column, direction });
