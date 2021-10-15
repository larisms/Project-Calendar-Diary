import React from "react";
import {Route} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {apis} from "../lib/axios";
import {Cookies} from "react-cookie";

import User from "../pages/User";
import Main from "../pages/Main";
import Error from "../pages/Error";

import {history} from "../redux/configureStore";
import showError from "../redux/modules/error";


function App() {

    //로그인 안하고 확인할때 false 를 true 로 바꿔주세요
    const [is_login, setstate] = React.useState("false");

    //로그인 안하고 확인할때 여기부터 ~
    React.useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("token");

        console.log("token? :::",token)
        if(token === undefined){
          setstate(false);
          history.push('/login');
          console.log("token is undefined")
        }else if (token !== undefined){
          apis.logInAX(token).then((res)=>{
            if(res.data.msg === "fail"){
              alert("로그인 인증 에러")
              setstate(false);
              history.push('/login');
            }else if(res.data.msg === "success"){
              setstate(true);
              console.log("res:::",res);
              history.push('/');
            }else if(res.status >400){
              showError(res.status,res.data.msg);
              history.push('/error');
              
            }
          })
        }
    }, [])
    //~ 여기까지 주석처리 하면 됩니다.

    return (
        <ConnectedRouter history={history}>
            {
                is_login
                    ? (<Route path="/" exact component={Main}/>)
                    : (<Route path="/login" exact component={User}/>)
            }
            <Route path="/error" exact component={Error}/>
        </ConnectedRouter>

    );
}

export default App;
