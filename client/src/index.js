import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { getAllUsers } from "./actions/userActions";
import { getAllPosts } from "./actions/postActions";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getAllUsers());
store.dispatch(getAllPosts());
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
