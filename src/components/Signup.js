import React from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import Input from "../elements/Input";

import { actionCreators as signupAction } from "../redux/modules/user";
import { signupShow, loginShow } from "../redux/modules/show";

const Signup = () => {

    const dispatch = useDispatch();

    //경고문 설정
    const [warnPW, setwarnPW] = React.useState();
    const [warnCheckPW, setwarnCheckPW] = React.useState();

    //입력된 값의 통과 여부
    //fail:통과하지 못함, success 통과
    const [passID, setPassID] = React.useState('fail'); 
    const [passPW, setPassPW] = React.useState('fail');

    const warnID = useSelector(state => state.user.warnID);

    //입력이 끝난 input 값
    const ID = React.useRef();
    const PW = React.useRef();
    const checkPW = React.useRef();

    //경고문 변화 1초단위로 감지
    const valueID = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var eng = /^[a-zA-Z]*$/;
        if (!eng.test(value)) {
            dispatch(signupAction.changeWarnID("영어만 입력해주세요"))
            setPassID('fail')
        } else if (value.length < 4){
            dispatch(signupAction.changeWarnID("4자 이상 입력해주세요"))
            setPassID('fail')
        } 
        else {
            dispatch(signupAction.changeWarnID(""));
            setPassID("success")
        }
        
    }, 1000), [])
    

    const valuePW = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        if (value.length < 4) {
            setwarnPW("4자 이상 입력해주세요")
            setPassPW("fail")
        } else if(value.indexOf(ID.current.value) !== -1){
            setwarnPW("아이디와 다르게 입력해주세요")
            setPassPW("fail")
        }
        else {
            setwarnPW("")
            setPassPW("success")
        }
    }, 1000), [])
    

    //중복확인 클릭시
    const overlap = () => {
        dispatch(signupAction.checkOverlapMW(ID.current.value)) 
    }

    //가입하기 버튼 클릭시
    const signup = () => {
        console.log("ID success? :::",passID);
        console.log("PW success? :::",passPW);
        //회원가입 절차
        if (ID.current.value === "" || PW.current.value === "" || checkPW.current.value === "") {
            alert("입력창에 값을 입력해주세요!")
        } else if (PW.current.value !== checkPW.current.value) {
            setwarnCheckPW('비밀번호가 서로 다릅니다!') 
        } else if(warnID !== "사용 가능한 아이디입니다"){
            alert("아이디 중복을 확인해주세요!")
        } else if (passID === "success" && passPW === "success" && warnID === "사용 가능한 아이디입니다"){
            //axios로 값 넘겨줌
            dispatch(signupAction.createAccountMW(ID.current.value,PW.current.value,checkPW.current.value))
        } else {
            alert("입력한 값들을 다시 확인해주세요.")
        }
    }

    const goBackToLogin = () => {
        dispatch(signupShow(false));
        dispatch(loginShow(true));
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={goBackToLogin}>뒤로가기</button>
                <h1>회원가입</h1>
                <label>
                    <p>ID</p>
                    <Input
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
                    <Input
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
                    <Input type="password" ref={checkPW}/>
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