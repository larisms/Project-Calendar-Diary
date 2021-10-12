//로그인,회원가입 모듈

import produce from "immer";
import {createAction, handleActions} from "redux-actions";
import {apis} from "../../lib/axios";
import {signupShow, loginShow} from "./show";

//로그인,회원가입 페이지 렌더링 응답? 회원가입 정보 초기값
const initialState = {
    createAccount: [
        {
            userID: "userID",
            PW: "PW",
            confirmPW: "confirmPW"
        }
    ],
    warnID: ""
}

const CREATE_ACCOUNT = "CREATE_ACCOUNT";
const ID_OVERLAP = "ID_OVERLAP";

const creatAccount_ = createAction(
    CREATE_ACCOUNT,
    (userID, PW, confirmPW) => ({userID, PW, confirmPW})
);
const checkOverlapID = createAction(ID_OVERLAP, (warnID) => ({warnID}))

//회원가입 등록
const createAccountMiddleware = (userID, PW, confirmPW) => {
    return function (dispatch, getState, {history}) {
        const user = {
            userID: userID,
            PW: PW,
            confirmPW: confirmPW
        }

        apis
            .createAccount(user)
            .then((res) => {
                console.log("React send User info :::", user)
                if (res.data === "success") {
                    dispatch(creatAccount_(user))
                    dispatch(signupShow(false));
                    dispatch(loginShow(true));
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

//회원가입시 아이디 중복확인
const checkOverlapIDMiddlevare = (userID) => {
    return function (dispatch, getState, {history}) {
        apis
            .checkOverlapID(userID)
            .then((res) => {
                if (res.data === "seccess") {
                    dispatch(checkOverlapID("사용 가능한 아이디입니다."))
                }else{
                    dispatch(checkOverlapID("사용 할 수 없는 아이디입니다."))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export default handleActions({
    [CREATE_ACCOUNT]: (state, action) => produce(state, (draft) => {
        const newAccount = {
            userID: action.payload.userID,
            PW: action.payload.PW,
            confirmPW: action.payload.confirmPW
        }
        draft.createAccount = {
            ...draft.createAccount,
            newAccount
        }
    }),
    [ID_OVERLAP]: (state, action) => (state, (draft) => {
        draft.ID_OVERLAP = action.payload.warnID
    })
}, initialState);

export const actionCreators = {
    creatAccount_,
    checkOverlapID,
    createAccountMiddleware,
    checkOverlapIDMiddlevare
}