import React from "react";
import { useSelector } from "react-redux";

import Login from "../components/Login";
import Signup from "../components/Signup"


const Signin =()=>{
    const Login_control = useSelector(state => state.show.login);
    const Signup_control = useSelector(state => state.show.signup);

    return (
        <React.Fragment>
            {Login_control? <Login/> : null}
            {Signup_control? <Signup/>: null}
        </React.Fragment>
    )
}

export default Signin;