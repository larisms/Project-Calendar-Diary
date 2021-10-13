import React from "react";
import styled from "styled-components";

const Input = (props) => {
    const {type, onChange, placeholder} = props
    const styles = {

    }
    return (
        <StyledInput type={type} onChange={onChange} placeholder={placeholder}/>
    )
}

Input.defaultProps = {
    type:"text",
    ref:"",
    onChange:"",
    placeholder:"",
}

const StyledInput = styled.input`

`;

export default Input;