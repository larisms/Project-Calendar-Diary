import React from "react";
import { useSelector , useDispatch} from "react-redux";
import User from "../pages/User";
import Main from "../pages/Main";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route } from "react-router";
import {apis} from "../lib/axios"
import {actionCreators as userAction} from "../redux/modules/user"

function App() {
  // const dispatch = useDispatch();
  // const is_login = useSelector(state => state.user.is_login)

  React.useEffect(()=>{
    apis.logInAX().then((res)=>{
      if(res.data.msg === "success"){
          history.push('/');
      }else{
        history.push('/login');
      }
      console.log(res.data[0].msg);
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
