import {  createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import reducers from "./Reducers/rootReducer";

export const store = createStore(
    reducers,
    composeWithDevTools()
  );