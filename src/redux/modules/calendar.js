import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";
import { get } from "lodash";

//Action
const SET_CALENDAR = "SET_CALENDAR";
const ADD_CALENDAR = "ADD_CALENDAR";

//Action Creator
const setCalendar = createAction(SET_CALENDAR, (post_list) => ({ post_list }));
const addCalendar = createAction(ADD_CALENDAR, (post) => ({ post }));

const initialState = {
  list: [],
};

const setCalendarMW = (_today) => {
  return function (dispatch) {
    apis
      .getPostAX({ params: { date: _today } })
      .then((res) => {
        const post_list = res.data;
        const new_list = post_list.map((l, idx) => {
          return {
            _id: idx,
            date: l.date,
            title: l.title,
            color: l.color,
          };
        });
        console.log("this month list New:::", new_list);
        dispatch(setCalendar(new_list));
        // console.log("this month list :::",post_list);
      })
      .catch((err) => {
        console.log("에러발생", err);
      });
  };
};

const addCalendarMW = (post) => {
  return function (dispatch, getState, { history }) {
    const State = getState().calendar.list;
    const Post = {
      _id: State.length + 1,
      date: post.date,
      title: post.title,
      color: post.color,
    };
    const newList = [...State, Post];

    const List = newList.map((l, idx) => {
      return {
        _id: l._id,
        date: l.date,
        title: l.title,
        color: l.color,
      };
    });

    dispatch(addCalendar(List));
    console.log("[module calendar] List ::: ", List);
  };
};

export default handleActions(
  {
    [SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
  },
  initialState
);

const actionCreators = {
  setCalendar,
  setCalendarMW,
  addCalendar,
  addCalendarMW,
};

export { actionCreators };
