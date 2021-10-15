import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { actionCreators as editActions } from "../redux/modules/calendar";
import { addShow, detailShow } from "../redux/modules/show";
import { Input, Grid, Text, Button } from "../elements";
import styled from "styled-components";

const Detail = (props) => {
  // const { date } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.detail.list);

  const date = props.date;
  console.log("날짜보기프롭스", props);
  console.log("클릭날짜", date);

  // const post_id = props.match.params.id;
  console.log("프롭스", props);
  console.log("디테일에포스트리스트", post_list);

  React.useEffect(() => {
    dispatch(detailActions.setContentMW(date));
  }, []);

  const _delContent = (id) => {
    dispatch(detailActions.delContentMW(id));
  };

  const exitDetail = () => {
    dispatch(detailShow(false));
  };

  const goToAdd = () => {
    dispatch(detailShow(false));
    dispatch(addShow(true));
  };

  return (
    <React.Fragment>
      <p>{date}</p>
      {post_list.map((p, idx) => {
        return (
          <div key={idx}>
            <Text fontSize="20px">{p.title}</Text>
            <Text fontSize="20px">{p.content}</Text>
            {/* <button title={p.title} onClick={(e) => {
                            console.log("수정온클릭", e);
                        }}>수정</button> */}

            <button
              onClick={() => {
                dispatch(detailActions.editContent(p));
                dispatch(editActions.detailCalendar(post_list));
                goToAdd();
                console.log("수정온클릭 피피피", p);
                console.log("수정온클릭 피 아이디", p._id);
              }}
            >
              수정
            </button>

            <button
              key={p._id}
              onClick={() => {
                const id = p._id;
                _delContent(id);
                console.log("맵포스트아이디", p._id);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <button onClick={goToAdd}>추가하기</button>
      <button onClick={exitDetail}>창닫기</button>
    </React.Fragment>
  );
};

const ModalBG = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  max-width: 700px;
  height: 70vh;
  padding: 30px;
  background-color: white;
  z-index: 40;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

export default Detail;
