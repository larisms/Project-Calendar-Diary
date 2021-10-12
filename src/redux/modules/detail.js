import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";


const SET_CONTENT = "SET_CONTENT"
const ADD_CONTENT = "ADD_CONTENT"
const DEL_CONTENT = "DEL_CONTENT"

const setContent = createAction(SET_CONTENT, (post_list) => ({ post_list }));
const addContent = createAction(ADD_CONTENT, (post) => ({ post }));


const initialState = {
    list: [{
        title: "first title",
        content: "first content",
    }],
};

const initialPost = {

};

const addContentMW = (post) => {
    return function(dispatch, getState, {history}){
        console.log("post넘겨받기", post)
        apis
        .addContentAX(post)
        .then(() => {
            dispatch(addContent(post));
        })
        .catch((err) => {
            console.log("애드에러");
        })
    }
};

const setContentMW = () =>{
    return function(dispatch, getState, {history}){
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
}


export default handleActions(
    {
        [SET_CONTENT]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list
        }),

        [ADD_CONTENT]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload.post)
        }),
    }, initialState
);


const actionCreators = {
    setContent,
    addContent,
    addContentMW,
    setContentMW,
};

export { actionCreators };