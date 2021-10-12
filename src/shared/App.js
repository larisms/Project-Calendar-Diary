import React from "react";

import User from "../pages/User";
import Main from "../pages/Main";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import { Route } from "react-router";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/login" exact component={User}/>
      <Route path="/" exact component={Main}/>
    </ConnectedRouter>
  );
}

export default App;
