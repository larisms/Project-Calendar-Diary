import React from "react";

import styled from "styled-components";

import {useDispatch} from "react-redux";
import {signupShow, loginShow} from "../redux/modules/show";
import {actionCreators as loginAction} from "../redux/modules/user";
import {Input, Grid, Text, Button} from "../elements";

const Login = () => {

    const dispatch = useDispatch();

    const [warn, setWarn] = React.useState("");

    const [ID, setID] = React.useState("");
    const [PW, setPW] = React.useState("");

    const goToSignup = () => {
        dispatch(loginShow(false));
        dispatch(signupShow(true));
    }

    const login = () => {
        if (ID !== "" && PW !== "") {
            console.log("ID:::", ID);
            console.log("PW:::", PW);
            dispatch(loginAction.loginMW(ID, PW))
        } else if (ID === "" || PW === "") {
            setWarn('아이디, 혹은 비밀번호를 확인해주세요!');
        }
    }

    const onChangeWarnID = (e) => {
        setID(e.target.value);
        setWarn("");
    }
    const onChangeWarnPW = (e) => {
        setPW(e.target.value);
        setWarn("");
    }

    return (
        <React.Fragment>
            <StyledSection>
                <StyledTitle>
                    <Text fontSize="3rem">Calendar type</Text>
                    <Text fontSize="5.3rem">Diary</Text>
                </StyledTitle>
                <StyledLabel>
                    <Grid width="75px">
                        <Text fontSize="3rem" color="#967A6D">ID</Text>
                    </Grid>
                    <Grid>
                        <Input type="text" onChange={onChangeWarnID}/>
                    </Grid>
                </StyledLabel>
                <StyledLabel>
                    <Grid width="75px">
                        <Text fontSize="3rem" color="#967A6D">PW</Text>
                    </Grid>
                    <Grid>
                        <Input type="password" onChange={onChangeWarnPW}/>
                        <span>{warn}</span>
                    </Grid>
                </StyledLabel>
                <Grid>
                    <Grid margin="58px 0 20px 0">
                        <Button onClick={goToSignup} backGround="#E5BBB4" color="#818D90">SIGNUP</Button>
                    </Grid>
                    <Grid>
                        <Button onClick={login} color="#E4D8D3">LOGIN</Button>
                    </Grid>
                </Grid>
            </StyledSection>
        </React.Fragment>
    )
}

const StyledSection = styled.section `

max-width: 582px;
width:49%;
padding: 50px 40px;
background-color: #EAE6E2;
border: 2px solid rgba(129, 141, 144, 0.2);
box-sizing: border-box;
box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.25);
border-radius: 20px 0px;

@media only screen and (max-width:768px){
    width: 100%;
    border:none;
    padding: 50px 8%;
    box-shadow:none;
}

`

const StyledTitle = styled.div`

width: 100%;
text-align: center;

`

const StyledLabel = styled.label `
display: flex;

&:nth-child(2){margin-top:62px;}
&:nth-child(3){margin-top:34px;}

span{
    display: block;
    width: 100%;
    height: 18px;
    font-size: 1.5rem;
    text-align: right;
    margin-top: 15px;
}

@media only screen and (max-width:760px){
    flex-direction: column;

    div:first-child{
        margin-bottom: 10px;
    }
}

`

export default Login;