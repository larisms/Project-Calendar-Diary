import React from "react";

import User from "../pages/User";
import Main from "../pages/Main";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route } from "react-router";
import {apis} from "../lib/axios"

function App() {

  React.useEffect(()=>{
    apis.logInAX().then((res)=>{
      if(res.data.msg === "success"){
          history.push('/');
      }else{
        history.push('/login');
      }
  })
  },[])

  return (
    <ConnectedRouter history={history}>
      <Route path="/login" exact component={User}/>
      <Route path="/" exact component={Main}/>
    </ConnectedRouter>
  );
}

export default App;
