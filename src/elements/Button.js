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
    background: darken(${(props)=>props.backGround}, 1.5%);
    border: 1px solid rgba(#000, .05);
    box-shadow: 1px 1px 2px rgba(#fff, .2);
    color: lighten(${(props)=>props.backGround}, 18%); 
    text-decoration: none;
    text-shadow: -1px -1px 0 darken(${(props)=>props.backGround}, 9.5%);
}

`

export default Button;
