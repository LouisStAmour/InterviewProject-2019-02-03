import { IAction } from "./actions";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { cmcIdEpic, cmcQuoteEpic, cmcQuoteAfterIdFetch } from "./api-epics";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import { compose } from "redux";

const epicMiddleware = createEpicMiddleware<IAction>();

// To enable Redux DevTools Extension:
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export default function configureStore() {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  const rootEpic = combineEpics(cmcIdEpic, cmcQuoteAfterIdFetch, cmcQuoteEpic);
  epicMiddleware.run(rootEpic);
  return store;
}
