import React from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import styled from "styled-components";

import {Input, Grid, Text, Button} from "../elements";
import {StyledSection, StyledLabel} from "../shared/style"

import {actionCreators as signupAction} from "../redux/modules/user";
import {signupShow, loginShow} from "../redux/modules/show";

const Signup = () => {

    const dispatch = useDispatch();

    //경고문 설정
    const [warnPW, setwarnPW] = React.useState();
    const [warnCheckPW, setwarnCheckPW] = React.useState();

    //입력된 값의 통과 여부 fail:통과하지 못함, success 통과
    const [passID, setPassID] = React.useState('fail');
    const [passPW, setPassPW] = React.useState('fail');

    const warnID = useSelector(state => state.user.warnID);

    // input 값 const ID = React.useRef(); const PW = React.useRef(); const checkPW =
    // React.useRef();
    const [ID, setID] = React.useState();
    const [PW, setPW] = React.useState();
    const [confirmPW, setConfirmPW] = React.useState();

    //경고문 변화 1초단위로 감지
    const valueID = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var eng = /^[a-zA-Z]*$/;
        if (!eng.test(value)) {
            dispatch(signupAction.changeWarnID("영어만 입력해주세요"))
            setPassID('fail')
        } else if (value.length < 4) {
            dispatch(signupAction.changeWarnID("4자 이상 입력해주세요"))
            setPassID('fail')
        } else {
            dispatch(signupAction.changeWarnID(""));
            setPassID("success")
        }
    }, 1000), [])

    const valuePW = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        if (value.length < 4) {
            setwarnPW("4자 이상 입력해주세요")
            setPassPW("fail")
        } else if (value.indexOf(ID) !== -1) {
            setwarnPW("아이디와 다르게 입력해주세요")
            setPassPW("fail")
        } else {
            setwarnPW("")
            setPassPW("success")
        }
    }, 1000), [ID])

    const onChangeID = (e) => {
        valueID(e);
        setID(e.target.value);
    }
    const onChangePW = (e) => {
        console.log(ID);
        valuePW(e);
        setPW(e.target.value);

    }
    const onChangeConfirmPW = (e) => {
        setConfirmPW(e.target.value);
    }

    //중복확인 클릭시
    const overlap = () => {
        console.log("overlap ID :::", ID);
        dispatch(signupAction.checkOverlapMW(ID))
    }

    //가입하기 버튼 클릭시
    const signup = () => {
        console.log(ID);
        console.log("ID success? :::", passID);
        console.log("PW success? :::", passPW);
        //회원가입 절차
        if (ID === "" || PW === "" || confirmPW === "") {
            alert("입력창에 값을 입력해주세요!")
        } else if (PW !== confirmPW) {
            setwarnCheckPW('비밀번호가 서로 다릅니다!')
        } else if (warnID !== "사용 가능한 아이디입니다") {
            alert("아이디 중복을 확인해주세요!")
        } else if (passID === "success" && passPW === "success" && warnID === "사용 가능한 아이디입니다") {
            //axios로 값 넘겨줌
            dispatch(signupAction.createAccountMW(ID, PW, confirmPW))
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
            <StyledSection>
                <StyledGoBack onClick={goBackToLogin}>{'< back'}</StyledGoBack>
                <StyledLabel
                    style={{
                        flexDirection: "column",
                        marginTop: "20px"
                    }}>
                    <Grid width="75px">
                        <Text fontSize="3rem" color="#967A6D">ID</Text>
                    </Grid>
                    <Grid>
                        <StyledSpan>{warnID}</StyledSpan>
                        <Grid>
                            <Input type="text" onChange={onChangeID}/>
                            <StyledOverlap onClick={overlap}>중복확인</StyledOverlap>
                        </Grid>

                    </Grid>
                </StyledLabel>
                <StyledLabel
                    style={{
                        flexDirection: "column",
                        marginTop: "50px"
                    }}>
                    <Grid width="75px">
                        <Text fontSize="3rem" color="#967A6D">PW</Text>
                    </Grid>
                    <Grid>
                        <StyledSpan>{warnPW}</StyledSpan>
                        <Input type="password" onChange={onChangePW}/>

                    </Grid>
                </StyledLabel>
                <StyledLabel
                    style={{
                        flexDirection: "column",
                        marginTop: "20px"
                    }}>
                    <Grid>
                        <Text fontSize="3rem" color="#967A6D">confirm PW</Text>
                    </Grid>
                    <Grid>
                        <StyledSpan>{warnCheckPW}</StyledSpan>
                        <Input type="password" onChange={onChangeConfirmPW}/>
                    </Grid>
                </StyledLabel>
                <Grid margin="95px 0 0 0">
                    <Button onClick={signup} backGround="#E5BBB4" color="#818D90">SIGNUP</Button>
                </Grid>
            </StyledSection>
        </React.Fragment>
    )
}

const StyledGoBack = styled.button `
font-size: 2rem;
color:#818D90;
position: absolute;
top: 20px;
left: 20px;
border: none;
background: none;

`

const StyledOverlap = styled.button `

position: absolute;
width: fit-content;
padding: 5px 10px;
bottom:12.5px;
right: 20px;
font-size: 1.5rem;
background: none;
border: none;
color: #818D90;

`

const StyledSpan = styled.span `
color: #818D90;
position:absolute;
right: 0;
top:0;

`

export default Signup;