import React from "react";

import Signin from "../pages/Signin";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import { Route } from "react-router";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/sign" component={Signin}/>
    </ConnectedRouter>
  );
}

export default App;
