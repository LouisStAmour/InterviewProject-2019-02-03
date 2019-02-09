import { IAction, Types, ISort } from "./actions";
import * as api from "./api-epics";
import { Reducer } from "redux";
import { Set } from "immutable";

export interface IState {
  cmcIds: number[];
  cmcQuotes: api.ICMCQuoteData[];
  error: {
    status: api.ICMCStatus;
    action: IAction;
  } | null;
  shownInTable: Set<number>;
  tableSort: ISort;
}

export const reducer: Reducer<IState, IAction> = (
  state = {
    cmcIds: [],
    cmcQuotes: [],
    error: null,
    shownInTable: Set<number>(),
    tableSort: { column: "cmc_rank", direction: "asc" }
  },
  action
) => {
  if (action.type === Types.CMC_ID_FETCH_SUCCEEDED) {
    return {
      ...state,
      cmcIds: action.ids,
      error: null
    };
  } else if (action.type === Types.CMC_QUOTES_FETCH_SUCCEEDED) {
    return {
      ...state,
      cmcQuotes: action.quotes,
      shownInTable: Set(state.cmcIds.slice(0, 5)),
      error: null
    };
  } else if (
    action.type === Types.CMC_ID_FETCH_FAILED ||
    action.type === Types.CMC_QUOTES_FETCH_FAILED
  ) {
    return {
      ...state,
      error: {
        status: action.status,
        action: action.action
      }
    };
  } else if (
    action.type === Types.CMC_ID_FETCH ||
    action.type === Types.CMC_QUOTES_FETCH
  ) {
    return {
      ...state,
      error: null
    };
  } else if (action.type === Types.ADD_TO_TABLE) {
    return {
      ...state,
      shownInTable: state.shownInTable.add(action.id)
    };
  } else if (action.type === Types.REMOVE_FROM_TABLE) {
    return {
      ...state,
      shownInTable: state.shownInTable.remove(action.id)
    };
  } else if (action.type === Types.SORT_TABLE) {
    return {
      ...state,
      tableSort: {
        column: action.column,
        direction: action.direction
      }
    };
  }

  return state;
};
