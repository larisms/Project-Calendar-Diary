//로그인,회원가입 모듈

import produce from "immer";
import {createAction, handleActions} from "redux-actions";
import { apis } from "../../lib/axios";

//로그인,회원가입 페이지 렌더링 응답?

//회원가입 정보 초기값
const initialState = {
    list: [
        {
            userID: "userID",
            PW: "PW",
            confirmPW: "confirmPW"
        }
    ]
}


const SIGNUP = "SIGNUP";

const signUp = createAction(SIGNUP, (userID, PW, confirmPW) => ({userID, PW, confirmPW}));


const createAccountMiddleware = (userID,PW,confirmPW) => {
    return function (dispatch, getState, {history}) {
        const user = {userID:userID, PW:PW, confirmPW:confirmPW}
        console.log(user);
        apis.createAccount(user)
        .then(()=>{ 
            dispatch(signUp(userID,PW,confirmPW))
            console.log("값 넘겨줌")
        })
        .catch((error)=>{console.log(error)});
    }
}

export default handleActions({
    [SIGNUP]: (state, action) => produce(state, (draft) => {
        const newList = {userID:action.draft.userID, PW:action.draft.PW, confirmPW:action.draft.confirmPW}
        draft.list = [newList];
    }),
}, initialState);

export const actionCreators = {
    signUp,
    createAccountMiddleware,
}