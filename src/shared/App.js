import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { apis } from "../lib/axios";

import User from "../pages/User";
import Main from "../pages/Main";

import { history } from "../redux/configureStore";



function App() {

  const [is_login, setstate] = React.useState("false");

  React.useEffect(()=>{
    apis.logInAX().then((res)=>{
      if(res.data.msg === "success"){
          setstate(true);
          history.push('/');
      }else{
          setstate(false);
          history.push('/login');
      }
  })
  },[])

  return (
    <ConnectedRouter history={history}>
      {is_login ? (
        <Route path="/" exact component={Main} />
      ) : (
        <Route path="/login" exact component={User} />
      )}
    </ConnectedRouter>

  );
}

export default App;
