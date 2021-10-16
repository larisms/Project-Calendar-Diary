import React from "react";
import { useSelector } from "react-redux";

const Error = () =>{

    // const status = useSelector(state => state.error.errorCode);
    // const statusMsg = useSelector(state => state.error.errorMsg);
    // const test = useSelector(state => state.calendar.delCount);

    return(
        <React.Fragment>
            <h1>500 error</h1>
        </React.Fragment>
    )
}

export default Error;