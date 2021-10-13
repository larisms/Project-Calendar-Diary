import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const { is_flex, width, margin, padding, bg, children } = props;
    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
    };

    return (
        <StyledGrid {...styles}>{children}</StyledGrid>
    )
}


Grid.defaultProps = {
    is_flex:false,
    width:"100%",
    margin:0,
    padding:0,
    background:false,
}

const StyledGrid = styled.div`


`;

export default Grid;