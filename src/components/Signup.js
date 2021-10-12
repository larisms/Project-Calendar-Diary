import React from "react";
import {useDispatch} from "react-redux";
import _ from "lodash";


import { actionCreators as signupAction } from "../redux/modules/user";

const Signup = () => {

    const dispatch = useDispatch();

    //경고문 설정
    const [warnID, setWarnID] = React.useState();
    const [warnPW, setwarnPW] = React.useState();
    const [warnCheckPW, setwarnCheckPW] = React.useState();

    //입력이 끝난 input 값
    const ID = React.useRef();
    const PW = React.useRef();
    const checkPW = React.useRef();

    //경고문 변화 1초단위로 감지
    const valueID = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var eng = /^[a-zA-Z]*$/;
        if (!eng.test(value)) {
            setWarnID("영어만 입력해주세요")
        } else if (value.length < 4){
            setWarnID("4자 이상 입력해주세요")
        } 
        else {
            setWarnID("")
        }
    }, 1000), [])

    const valuePW = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        if (value.length < 4) {
            setwarnPW("4자 이상 입력해주세요")
        } else if(value.indexOf(ID.current.value) !== -1){
            setwarnPW("아이디와 다르게 입력해주세요")
        }
        else {
            setwarnPW("")
        }
    }, 1000), [])



    //중복확인 클릭시
    const overlap = () => {
        console.log("아이디 중복 확인")
    }

    //가입하기 버튼 클릭시
    const signup = () => {
        console.log(ID.current.value)
        //회원가입 절차
        if (ID.current.value === "" || PW.current.value === "" || checkPW.current.value === "") {
            alert("입력창에 값을 입력해주세요!")
        } else if (PW.current.value !== checkPW.current.value) {
            setwarnCheckPW('비밀번호가 서로 다릅니다!')
        } else {
            //axios로 값 넘겨줌
            dispatch(signupAction.createAccountMiddleware(ID.current.value,PW.current.value,checkPW.current.value))
        }
    }

    return (
        <React.Fragment>
            <section>
                <h1>회원가입</h1>
                <label>
                    <p>ID</p>
                    <input
                        type="text"
                        ref={ID}
                        onChange={(e) => {
                            valueID(e)
                        }}/>
                    <button onClick={overlap}>중복확인</button>
                    <span
                        style={{
                            color: "#ccc"
                        }}>{warnID}</span>
                </label>
                <label>
                    <p>PW</p>
                    <input
                        type="password"
                        ref={PW}
                        onChange={(e) => {
                            valuePW(e)
                        }}/>
                    <span
                        style={{
                            color: "#ccc"
                        }}>{warnPW}</span>
                </label>
                <label>
                    <p>PW 재확인</p>
                    <input type="password" ref={checkPW}/>
                    <span
                        style={{
                            color: "#ccc"
                        }}>{warnCheckPW}</span>
                </label>
                <button onClick={signup}>가입하기</button>
            </section>
        </React.Fragment>
    )
}

export default Signup;