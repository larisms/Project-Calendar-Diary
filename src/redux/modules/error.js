import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

const initialState = {

    errorCode : 0,
    errorMsg :""
}

const ERROR = "ERROR";
export const showError = createAction((code, Msg)=>({code, Msg}))

export default handleActions({
    [ERROR]: (state, action) => produce(state, (draft) => {
        draft.errorCode = action.payload.code;
        draft.errorMsg = action.payload.Msg;
    }),
},initialState);