import styled from "styled-components";


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

export {StyledLabel,StyledSection} 