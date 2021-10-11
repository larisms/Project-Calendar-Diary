import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";


const SET_CONTENT = "SET_CONTENT"
const ADD_CONTENT = "ADD_CONTENT"

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
};

export { actionCreators };