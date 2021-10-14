import styled from "styled-components";

//로그인/회원가입 페이지 디자인
const StyledSection = styled.section `
position: relative;
max-width: 582px;
width:49%;
padding: 50px 40px;
background-color: #EAE6E2;
border-top: 2px solid rgba(129, 141, 144, 0.2);
border-left: 2px solid rgba(129, 141, 144, 0.2);
/* border-right: 2px solid rgba(129, 141, 144, 0.2); */
/* border-bottom: 2px solid rgba(129, 141, 144, 0.2); */
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

const StyledLabel = styled.label `
display: flex;
position: relative;

&:nth-child(2){margin-top:55px;}
&:nth-child(3){margin-top:20px;}


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

export {StyledLabel,StyledSection} 