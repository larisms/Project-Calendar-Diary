import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";
//Action
const SET_CALENDAR = "SET_CALENDAR";

//Action Creator
const setCalendar = createAction(SET_CALENDAR, (post_list) => ({ post_list }));

const initialState = {
  list: [
    {
      title: "테스트1",
      date: "2021-10-13",
      color: "red",
    },
  ],
};

const setCalendarMW = (_today) => {
  return function (dispatch) {
    apis
      .getPostAX({ params: { date: _today } })
      .then((res) => {
        const post_list = res.data;
        dispatch(setCalendar(post_list));
        console.log(post_list);
      })
      .catch((err) => {
        console.log("에러발생", err);
      });
  };
};

export default handleActions(
  {
    [SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  setCalendar,
  setCalendarMW,
};

export { actionCreators };
