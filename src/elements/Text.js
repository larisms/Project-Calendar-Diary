import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { children, fontSize, color, lineHeight, fontWeight,} = props;
    const styles = {
        fontSize:fontSize,
        color:color,
        lineHeight:lineHeight,
        fontWeight:fontWeight
    }
    return(
        <StyledText {...styles}>{children}</StyledText>
    )
}

Text.defaultProps = {
    fontSize:"1rem",
    color:"#818D90",
    lineHeight:"auto",
    fontWeight:"300"
}

const StyledText = styled.p`

font-size: ${(props)=>props.fontSize};
color:${(props)=>props.color};
line-height: ${(props)=>props.lineHeight};
font-weight: ${(props)=>props.fontWeight};

`

export default Text;

