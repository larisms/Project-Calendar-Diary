import React from "react";
import styled from "styled-components";

const Input = (props) => {
    const {type, onChange, placeholder, value} = props
    const styles = {

    }
    if(value.lenth >0){
        return (
            <StyledInput type={type} onChange={onChange} placeholder={placeholder} value={value} {...styles}/>
        )
    }else{
        return (
            <StyledInput type={type} onChange={onChange} placeholder={placeholder} {...styles}/>
        )
    }
    
}

Input.defaultProps = {
    type:"text",
    ref:"",
    onChange:"",
    placeholder:"",
    value:""
}

const StyledInput = styled.input`
width:100%;
height: 50px;
font-size: 2rem;
background: #FFFFFF;
border-radius: 10px 10px 50px 10px;
border: none;
padding: 0 20px;
box-sizing: border-box;
`;

export default Input;