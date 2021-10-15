import React from "react";
import { useSelector } from "react-redux";

const Error = () =>{

    const errorCode = useSelector(state => state.error.errorCode);
    const errorMsg = useSelector(state => state.error.errorMsg);

    return(
        <React.Fragment>
            <h1>{errorCode} error</h1>
            <h1>{errorMsg}</h1>
        </React.Fragment>
    )
}

export default Error;