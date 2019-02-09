import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { cmcIdFetch } from "./redux/actions";

const rootEl = document.getElementById("root");
const store = configureStore();
store.dispatch(cmcIdFetch(10));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
