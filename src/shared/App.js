import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { apis } from "../lib/axios";
import { Cookies } from "react-cookie";

import User from "../pages/User";
import Main from "../pages/Main";

import { history } from "../redux/configureStore";

function App() {
  const [is_login, setstate] = React.useState("false");

  React.useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    console.log("token? :::", token);
    if (token === undefined) {
      setstate(false);
      history.push("/login");
      console.log("token is undefined");
    } else if (token !== undefined) {
      apis.logInAX(token).then((res) => {
        if (res.data.msg === "fail") {
          alert("로그인상태 인증 에러");
          setstate(false);
          history.push("/login");
        } else if (res.data.msg === "success") {
          setstate(true);
          history.push("/");
        }
      });
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      {is_login ? (
        <Route path="/" exact="exact" component={Main} />
      ) : (
        <Route path="/login" exact="exact" component={User} />
      )}
    </ConnectedRouter>
  );
}

export default App;
