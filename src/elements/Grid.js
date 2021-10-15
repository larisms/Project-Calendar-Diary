import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const { display, width, margin, padding, backGround, children,style } = props;
    const styles = {
        display: display,
        width: width,
        margin: margin,
        padding: padding,
        backGround: backGround,
        style:style
    };

    return (
        <StyledGrid {...style} {...styles}>{children}</StyledGrid>
    )
}


Grid.defaultProps = {
    display:"block",
    width:"100%",
    margin:false,
    padding:false,
    backGround:"none",
}

const StyledGrid = styled.div`
display: ${(props)=>props.display};;
width: ${(props)=>props.width};
margin: ${(props)=>props.margin};
padding: ${(props)=>props.padding};
background: ${(props)=>props.backGround};

`;

export default Grid;