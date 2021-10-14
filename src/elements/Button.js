import React from "react";
import styled from "styled-components";

const Button =(props)=>{

    const {onClick, children, fontSize, color, height, width, backGround,borderRadius,border} = props;
    const styles = {
        fontSize:fontSize,
        color:color,
        height:height,
        width:width,
        backGround:backGround,
        borderRadius:borderRadius,
        border: border,
    }
    return (
        <StyledButton {...styles} onClick={onClick}>{children}</StyledButton>
    )
}

Button.defaultProps = {
    fontSize:"2rem",
    color:"white",
    height:"60px",
    width:"100%",
    backGround:"#818D90",
    borderRadius:"10px",
    border:"none",
}


const StyledButton = styled.button`

width:${(props)=>props.width};
height:${(props)=>props.height};
font-size:${(props)=>props.fontSize};
color:${(props)=>props.color};
background:${(props)=>props.backGround};
border:${(props)=>props.border};
border-radius:${(props)=>props.borderRadius};

&:hover{

}

`

export default Button;
