import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const { display, width, margin, padding, backGround, children, style, height } = props;
    const styles = {
        display: display,
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        backGround: backGround,
        style: style,
    };

    return (
        <StyledGrid {...style} {...styles}>{children}</StyledGrid>
    )
}


Grid.defaultProps = {
    display:"block",
    width:"100%",
    height: "100%",
    margin:false,
    padding:false,
    backGround:"none",
    border:"none",
    borderRadius:"10px",

}

const StyledGrid = styled.div`
display: ${(props)=>props.display};;
width: ${(props)=>props.width};
height: ${(props)=>props.height};
margin: ${(props)=>props.margin};
padding: ${(props)=>props.padding};
background: ${(props)=>props.backGround};
border: ${(props)=>props.border};
border-radius:${(props)=>props.borderRadius};

`;

export default Grid;