import React from "react";
import { useDispatch } from "react-redux";
import { signupShow, loginShow } from "../redux/modules/show";

const Login = () => {

    const dispatch = useDispatch();

    const ID = React.useRef();
    const PW = React.useRef();

    const goToSignup = () => {
        dispatch(loginShow(false));
        dispatch(signupShow(true));
    }

    // const login = () => {
    //     if
    // }

    return (
        <React.Fragment>
            <section>
                <h1>로그인</h1>
                <label>
                    <p>ID</p>
                    <input type="text" ref={ID}/>
                </label>
                <label>
                    <p>PW</p>
                    <input type="password" ref={PW}/>
                </label>
                <button onClick={goToSignup}>회원가입하기</button>
                <button>로그인</button>
            </section>
        </React.Fragment>
    )
}

export default Login;