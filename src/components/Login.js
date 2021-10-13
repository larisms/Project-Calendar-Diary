import React from "react";
import { useDispatch } from "react-redux";
import { signupShow, loginShow } from "../redux/modules/show";
import { actionCreators as loginAction } from "../redux/modules/user";
import Input from "../elements/Input";

const Login = () => {

    const dispatch = useDispatch();

    const [warnID, setWarnID] = React.useState("");
    const [warnPW, setWarnPW] = React.useState("");
    const [ID, setID] = React.useState("");
    const [PW, setPW] = React.useState("");

    const goToSignup = () => {
        dispatch(loginShow(false));
        dispatch(signupShow(true));
    }

    const login = () => {
        if(ID!== "" && PW !== ""){
            console.log("ID:::",ID);
            console.log("PW:::",PW);
            dispatch(loginAction.loginMW(ID,PW))
        }else if(ID.current.value === ""){
            setWarnID('아이디를 입력해주세요!');
        }else if(PW.current.value === ""){
            setWarnPW('비밀번호를 입력해주세요!');
        }
    }

    const onChangeWarnID = (e) => {
        setWarnID("")
        setID(e.target.value);
        
    }
    const onChangeWarnPW = (e) => {
        setWarnPW("")
        setPW(e.target.value);
    }

    return (
        <React.Fragment>
            <section>
                <h1>로그인</h1>
                <label>
                    <p>ID</p>
                    <Input type="text"  onChange={onChangeWarnID}/>
                    <span
                        style={{
                            color: "#ccc"
                        }}>{warnID}</span>
                </label>
                <label>
                    <p>PW</p>
                    <Input type="password"  onChange={onChangeWarnPW}/>
                    <span
                        style={{
                            color: "#ccc"
                        }}>{warnPW}</span>
                </label>
                <button onClick={goToSignup}>회원가입하기</button>
                <button onClick={login}>로그인</button>
            </section>
        </React.Fragment>
    )
}

export default Login;