import React from "react";
import {Cookies} from "react-cookie"

const Header = () => {
    const cookies = new Cookies();
    const logoutButton = () => {
        cookies.remove('token');
        window.location.reload();
    }

    return(
        <React.Fragment>
            <button onClick={logoutButton}>로그아웃</button>
        </React.Fragment>
    )
}

export default Header;