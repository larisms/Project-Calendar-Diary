import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import show from "./modules/show";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  show:show, 
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})];

// env = 현재 환경!
const env = process.env.NODE_ENV;

// 개발환경이면 redux-logger에서 logger 사용
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    let store = (initialStore) => createStore(rootReducer, enhancer);

    export default store();