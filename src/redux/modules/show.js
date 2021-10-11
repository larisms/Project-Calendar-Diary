//컴포넌트 노출 제어 모듈

import produce from "immer";
import {createAction, handleActions} from "redux-actions";

const initialState = {
    login : true,
    signup: false,
    detail: false,
    add: false
}

const LOGIN = "LOGIN";
const SIGN_UP = "SIGN_UP";
const DETAIL = "DETAIL";
const ADD = "ADD";

export const loginShow = createAction(LOGIN,(boolean)=>({boolean}));
export const signupShow = createAction(SIGN_UP,(boolean)=>({boolean}));
export const detailShow = createAction(DETAIL,(boolean)=>({boolean}));
export const addShow = createAction(ADD,(boolean)=>({boolean}));

export default handleActions(
    {
        [LOGIN]:(state, action)=>produce(state,(draft)=>{
            draft.login = action.payload.boolean;
        }),
        [SIGN_UP]:(state, action)=>produce(state,(draft)=>{
            draft.signup = action.payload.boolean;
        }),
        [DETAIL]:(state, action)=>produce(state,(draft)=>{
            draft.detail = action.payload.boolean;
        }),
        [ADD]:(state, action)=>produce(state,(draft)=>{
            draft.add = action.payload.boolean;
        }),
    },initialState
)

