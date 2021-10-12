import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const GET_DATE = "GET_DATE";

//Action Creators
const getDate = createAction(GET_DATE, (event_list) => ({ event_list }));

//initialState
const initialState = {
  list: [
    {
      title: "테스트입니다.",
      date: "2021-10-11",
      color: "red",
      visiable: false,
    },
  ],
};

//Reducer
export default handleActions(
  {
    [GET_DATE]: (state, action) =>
      produce(state, (draft) => {
        draft.event_list = action.payload.event_list;
      }),
  },
  initialState
);

const actionCreators = {
  getDate,
};

export { actionCreators };
