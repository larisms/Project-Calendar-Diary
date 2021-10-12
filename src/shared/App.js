import React from "react";
import { useSelector } from "react-redux";
import User from "../pages/User";
import Main from "../pages/Main";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import { Route } from "react-router";

function App() {
  const is_login = useSelector(state => state.user.is_login)
  React.useEffect(()=>{
    if(!is_login){
      history.push("/login")
    }
  })

  return (
    <ConnectedRouter history={history}>
      <Route path="/login" exact component={User}/>
      <Route path="/" exact component={Main}/>
    </ConnectedRouter>
  );
}

export default App;
