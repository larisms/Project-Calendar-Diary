import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { children, fontSize, color, lineHeight} = props;
    const styles = {
        fontSize:fontSize,
        color:color,
        lineHeight:lineHeight
    }
    return(
        <StyledText {...styles}>{children}</StyledText>
    )
}

Text.defaultProps = {
    fontSize:"1rem",
    color:"#818D90",
    lineHeight:"auto"
}

const StyledText = styled.p`

font-size: ${(props)=>props.fontSize};
color:${(props)=>props.color};
line-height: ${(props)=>props.lineHeight};

`

export default Text;

