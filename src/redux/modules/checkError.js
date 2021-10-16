import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

const initialState = {

    errorCode : "000 ",
    errorMsg :" 000"
}

const ERROR = "ERROR";
export const showError = createAction(ERROR,(code, Msg)=>({code, Msg}))

export default handleActions({
    [ERROR]: (state, action) => produce(state, (draft) => {
        console.log("[error js] code :::",action.payload.code )
        draft.errorCode = action.payload.code;
        draft.errorMsg = action.payload.Msg;
    }),
},initialState);