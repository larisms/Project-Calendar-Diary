import React from "react";
import {useDispatch} from "react-redux";
import {signupShow, loginShow} from "../redux/modules/show";
import _ from "lodash";

const Signup = () => {

    const dispatch = useDispatch();

    //경고문 설정
    const [warnID, setWarnID] = React.useState();
    const [warnPW, setwarnPW] = React.useState();
    const [warnCheckPW, setwarnCheckPW] = React.useState();

    //경고문 변화 1초단위로 감지
    const valueID = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var eng = /^[a-zA-Z]*$/;
        if (!eng.test(value)) {
            setWarnID("영어만 입력해주세요")
        } else {
            setWarnID("")
        }
    }, 1000), [])

    const valuePW = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        if (value.length < 4) {
            setwarnPW("4자 이상 입력해주세요")
        } else {
            setwarnPW("")
        }
    }, 1000), [])

    //버튼 클릭시 업데이트되는 input 값
    const ID = React.useRef();
    const PW = React.useRef();
    const checkPW = React.useRef();

    //중복확인 클릭시
    const overlap = () => {
        console.log("아이디 중복 확인")
    }

    //가입하기 버튼 클릭시
    const signup = () => {
        console.log(ID.current.value)
        //회원가입 절차
        if (ID === "" || PW === "" || checkPW === "") {
            alert("입력창에 값을 입력해주세요!")
        } else if (PW !== checkPW) {
            setwarnCheckPW('비밀번호가 서로 다릅니다!')
        } else {
            dispatch(signupShow(false));
            dispatch(loginShow(true));
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