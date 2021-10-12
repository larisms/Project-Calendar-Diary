import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Add from "../components/Add";
import Detail from "../components/Detail";


function App() {
  
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/add" exact component={Add} />
        <Route path="/add/:id" exact component={Add} />
        <Route path="/detail" exact component={Detail} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
