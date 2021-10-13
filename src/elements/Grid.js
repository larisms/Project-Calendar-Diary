import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const { display, width, margin, padding, backGround, children } = props;
    const styles = {
        display: display,
        width: width,
        margin: margin,
        padding: padding,
        backGround: backGround,
    };

    return (
        <StyledGrid {...styles}>{children}</StyledGrid>
    )
}


Grid.defaultProps = {
    display:"block",
    width:"100%",
    margin:0,
    padding:0,
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