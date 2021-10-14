import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";


const SET_CONTENT = "SET_CONTENT"
const ADD_CONTENT = "ADD_CONTENT"
const EDIT_CONTENT = "EDIT_CONTENT"
const DEL_EDIT = "DEL_EDIT"
const UDT_CONTENT = "UDT_CONTENT"
const DEL_CONTENT = "DEL_CONTENT"



const setContent = createAction(SET_CONTENT, (post_list) => ({ post_list }));
const addContent = createAction(ADD_CONTENT, (post) => ({ post }));
const editContent = createAction(EDIT_CONTENT, (post) => ({ post }));
const delEdit = createAction(DEL_EDIT, (post) => ({post}));
const udtContent = createAction(UDT_CONTENT, (post) => ({ post }));
const delContent = createAction(DEL_CONTENT, (id) => ({ id }));



const initialState = {
    list: [{}],
    editList: []
};

const initialPost = {

};

const setContentMW = () => {
    return function (dispatch, getState, { history }) {
        apis
            .setContentAX()
            .then((res) => {

                const _post_list = res
                console.log("리스폰스", _post_list);
                const post_list = res.data;
                console.log("리스폰스데이터", post_list);
                dispatch(setContent(post_list));
            })
            .catch((err) => {
                console.log("로드에러", err)
            })
    }
};

const addContentMW = (post) => {
    return function (dispatch, getState, { history }) {
        console.log("post넘겨받기", post)
        apis
            .addContentAX(post)
            .then(() => {
                dispatch(addContent(post));
            })
            .catch((err) => {
                console.log("애드에러", err);
            })
    }
};

const udtContentMW = (id, post) => {
    return function (dispatch, getState, { history }) {
        console.log("수정데이터미들웨어에받기", id, post)
        apis
            .udtContentAX({ params: { id : id }}, post)
            .then((res) => {
                dispatch(udtContent(id, post));
            })
            .catch((err) => {
                console.log("업데이트에러", err)
            })
    }
}

const delContentMW = (id) => {
    return function (dispatch, { histroy }) {
        console.log("포스트아이디넘겨받기", id)
        apis
            .delContentAX({ params: { id : id }})
            .then((res) => {
                console.log("알이에스", res)
                dispatch(delContent(id));
            })
            .catch((err) => {
                console.log("삭제에러", err)
            })
    }
}


export default handleActions(
    {
        [SET_CONTENT]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list
        }),

        [ADD_CONTENT]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload.post)
        }),

        [EDIT_CONTENT]: (state, action) => produce(state, (draft) => {
            draft.editList = action.payload.post;
            console.log("수정하기에디트리스트", draft.editList);
            console.log("수정하기넘겨받는포스트", action.payload.post);
        }),

        [DEL_EDIT]: (state, action) => produce(state, (draft) => {
            draft.editList = []
        }),

        [UDT_CONTENT]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => {
                console.log("업데이트 피아이디", p.id)
                console.log("업데이트 액션페이로드아이디", action.payload.id)
                return p.id === action.payload.id
            })
            draft.list[idx] = { ...draft.list[idx], ...action.payload.post}
        }),

        [DEL_CONTENT]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => {
                console.log("피피", p.id)
                return p.id === action.payload.id
            });

            if (idx !== -1) {
                draft.list.splice(idx, 1);
            }
        })
    }, initialState
);


const actionCreators = {
    setContent,
    addContent,
    editContent,
    delEdit,
    addContentMW,
    setContentMW,
    udtContentMW,
    delContentMW,
};

export { actionCreators };