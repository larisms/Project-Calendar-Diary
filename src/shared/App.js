import React from "react";

import User from "../pages/User";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import { Route } from "react-router";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/sign" component={User}/>
    </ConnectedRouter>
  );
}

export default App;
