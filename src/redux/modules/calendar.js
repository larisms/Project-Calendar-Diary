import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {apis} from "../../lib/axios";
import showError from "./checkError";

//Action
const SET_CALENDAR = "SET_CALENDAR";
const ADD_CALENDAR = "ADD_CALENDAR";
const EDIT_CALENDAR = "EDIT_CALENDAR";
const DETAIL_CALENDAR = "DETAIL_CALENDAR";
const ISGET_CALENDAR = "ISGET_CALENDAR";

//Action Creator
const setCalendar = createAction(SET_CALENDAR, (post_list) => ({post_list}));
const addCalendar = createAction(ADD_CALENDAR, (post) => ({post}));
const editCalendar = createAction(EDIT_CALENDAR, (post) => ({post}));
const detailCalendar = createAction(DETAIL_CALENDAR, (detail) => ({detail}));
const isGetCalendar = createAction(ISGET_CALENDAR, (count) => ({count}));

const initialState = {
    list: [
        {}
    ],
    editList: [],
    detailList: [],
    is_get: 0
};

const setCalendarMW = (_today) => {
    return function (dispatch,{history}) {
        apis
            .getPostAX({
                params: {
                    date: _today
                }
            })
            .then((res) => {

                const post_list = res.data;
                const new_list = post_list.map((l, idx) => {
                    return {_id: idx, date: l.date, title: l.title, color: l.color};
                });
                console.log("this month list New:::", new_list);
                dispatch(setCalendar(new_list));
                // console.log("this month list :::",post_list);
                dispatch(isGetCalendar())
            })
            .catch((err) => {
                console.log("에러발생", err);
                if(err.response.status === 404){
                    history.push('/error404');
                }else{
                    history.push('/error500');
                }
            });
    };
};

const addCalendarMW = (post) => {
    return function (dispatch, getState, {history}) {
        const State = getState().calendar.list;
        const Post = {
            _id: State.length + 1,
            date: post.date,
            title: post.title,
            color: post.color
        };
        const newList = [
            ...State,
            Post
        ];

        const List = newList.map((l, idx) => {
            return {_id: l._id, date: l.date, title: l.title, color: l.color};
        });

        dispatch(addCalendar(List));
        console.log("[module calendar] add List ::: ", List);
        dispatch(isGetCalendar())
    };
};

const editCalendarMW = (id, post) => {
    return function (dispatch, getState, {history}) {

        dispatch(editCalendar(post))

        //미완성 코드 ㅠㅠ
        const detailState = getState().calendar.detailList //상세창 이벤트 목록
        const allListState = getState().calendar.list //현재 캘린더의 모든 이벤트 목록
        const filterList = allListState.filter((x) => x.date === post.date); //수정한 이벤트(a)의 날짜와 맞는 캘린더의 이벤트 목록들 = x
        const postIndex = detailState.findIndex((x) => x._id === id); //a가 상세창에서 몇번째? == n
        const targetID = filterList[postIndex]; // x[n]의 _id 값

        console.log("[module calendar] edit before allListState:::", allListState);
        console.log("[module calendar] edit targetID:::", targetID);

        dispatch(isGetCalendar())
    }
}

export default handleActions({
    [SET_CALENDAR]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
    [ADD_CALENDAR]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post;
    }),
    [DETAIL_CALENDAR]: (state, action) => produce(state, (draft) => {
        draft.detailList = action.payload.detail;
        console.log("detail list :::", draft.detailList);
    }),
    [EDIT_CALENDAR]: (state, action) => produce(state, (draft) => {
        draft.editList = action.payload.post;
        // draft.detailList = action.payload.detail; console.log("detail list :::",
        // draft.detailList); console.log("[calendar] edit post :::",
        // action.payload.post)
    }),
    [ISGET_CALENDAR]: (state, action) => produce(state, (draft) => {
        draft.is_get = Number(Number(draft.is_get) + 1);
        console.log("change count:::", draft.is_get);
    })
}, initialState);

const actionCreators = {
    setCalendar,
    setCalendarMW,
    addCalendar,
    addCalendarMW,
    editCalendarMW,
    detailCalendar,
    editCalendar
};

export {
    actionCreators
};
