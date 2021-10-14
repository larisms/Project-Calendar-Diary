import React from "react";
import {Cookies} from "react-cookie"
import styled from "styled-components";

const Header = () => {
    const cookies = new Cookies();
    const logoutButton = () => {
        cookies.remove('token');
        window.location.reload();
    }

    return(
        <React.Fragment>
            <StyledHeader >
                <h1>Calendar type Diary</h1>
            <button onClick={logoutButton}>로그아웃</button>
            </StyledHeader>
        </React.Fragment>
    )
}

const StyledHeader = styled.section`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1194px;
width:100%;
height: 50px;
margin: 0 auto;
padding: 0 6%;
box-sizing: border-box;
position: sticky;

button{
    font-size: 1.5rem;
    border:none;
    background: none;
    color:#967A6D;
    
}
`

export default Header;