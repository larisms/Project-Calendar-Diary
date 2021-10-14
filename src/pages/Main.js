import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../lib/axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/common";

import Detail from "../components/Detail";
import Add from "../components/Add";
import Header from "../components/Header";
import { Grid } from "../elements";
import { detailShow, addShow } from "../redux/modules/show";
import { actionCreators as loginAction } from "../redux/modules/user";
import { actionCreators as calendarAction } from "../redux/modules/calendar";
import { actionCreators as detailActions } from "../redux/modules/detail";

import { actionCreators } from "../redux/modules/detail";

const Main = (props) => {
  const dispatch = useDispatch();
  const Detail_control = useSelector((state) => state.show.detail);
  const Add_control = useSelector((state) => state.show.add);
  const new_list = useSelector((state) => state.calendar.list);

  const [postList, setList] = React.useState(new_list);
  const [target_date, setTarget_date] = React.useState();

  const red_list = new_list.filter((event) => event.color === "#DD6262");
  const brown_list = new_list.filter((event) => event.color === "#B07255");
  const green_list = new_list.filter((event) => event.color === "#6C9D68");
  const blue_list = new_list.filter((event) => event.color === "#6A96B8");
  const gray_list = new_list.filter((event) => event.color === "#818D90");
  const purple_list = new_list.filter((event) => event.color === "#9F70BC");

  console.log(postList);
  console.log(new_list);
  const goToDetail = (info) => {
    setTarget_date(info.dateStr);
    dispatch(detailShow(true));
  };

  const thisMonthEventList = useSelector((state) => state.calendar.list);
  const testButton = () => {
    console.log("[Main] this month list:::", thisMonthEventList);
  };

  //서버로 부터 데이터 받아오기
  React.useEffect(() => {
    const _today = formatDate(
      calendarRef.current._calendarApi.currentDataManager.data.currentDate,
      {
        timeZone: "Asia/Seoul",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    apis.getPostAX({ params: { date: _today } }).then((res) => {
      const post_list = res.data;
      setList(...postList, post_list);
      console.log(post_list);
    });
    // apis   .getPostAX({ params: { date: _today } })   .then((res) => {     const
    // post = res.data;     setList(...list, post);   })   .catch((err) => {
    // console.error(err);   });
    dispatch(calendarAction.setCalendarMW(_today));
  }, [dispatch]);

  // Modal창 열기 함수 const modalOpen = (info) => {   setTarget_date(info.dateStr);
  // console.log(target_date);   setVisible(true);
  // apis.getPost("http://localhost:4000/?date=target_date"); }; 캘린더 제목 설정
  const titleFormat = {
    year: "numeric",
    month: "long",
  };

  //캘린더 전월로 이동하기 버튼
  const calendarRef = React.useRef();
  const PrevButton = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    const now_month = formatDate(
      calendarApi.currentDataManager.data.currentDate,
      {
        timeZone: "Asia/Seoul",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    console.log(now_month);
    apis.getPostAX({
      params: {
        date: now_month,
      },
    });
  };
  //캘린더 익월로 이동하기 버튼
  const NextButton = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    const now_month = formatDate(
      calendarApi.currentDataManager.data.currentDate,
      {
        timeZone: "Asia/Seoul",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    console.log(now_month);
    apis.getPostAX({
      params: {
        date: now_month,
      },
    });
  };

  return (
    <React.Fragment>
      <button onClick={testButton}>테스트 버튼</button>
      {Detail_control ? <Detail date={target_date} /> : null}
      {Add_control ? <Add date={target_date} /> : null}
      <Header />
      <Container>
        <section>
          <MonthMove>
            <button onClick={PrevButton}>{String("<")}</button>
            <button onClick={NextButton}>{String(">")}</button>
          </MonthMove>
        </section>
        <ButtonArea>
          <Button
            className=""
            tagColor={"#DD6262"}
            style={{
              background: "#DD6262",
            }}
            onClick={() => {
              setList(red_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#B07255"}
            style={{
              background: "#B07255",
            }}
            onClick={() => {
              setList(brown_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#6C9D68"}
            style={{
              background: "#6C9D68",
            }}
            onClick={() => {
              setList(green_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#6A96B8"}
            style={{
              background: "#6A96B8",
            }}
            onClick={() => {
              setList(blue_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#818D90"}
            style={{
              background: "#818D90",
            }}
            onClick={() => {
              setList(gray_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#9F70BC"}
            style={{
              background: "#9F70BC",
            }}
            onClick={() => {
              setList(purple_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#9F70BC"}
            style={{
              background: "#FFFFFF",
              border: "1px solid black",
            }}
            onClick={() => {
              setList(new_list);
            }}
          ></Button>
        </ButtonArea>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: "",
            center: "title",
            right: "today",
          }}
          titleFormat={titleFormat}
          events={postList}
          dateClick={goToDetail}
        />
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  /* height: 100%; */

  max-width: 1194px;
  width: 90%;
  margin: auto;
  margin-top: 20px;
  position: relative;
  & > section {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: -9px;
    z-index: 20;
  }
  .fc .fc-toolbar {
    position: relative;
    display: block;
    .fc-toolbar-chunk {
      display: block;
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        width: fit-content;
        position: absolute;
        text-align: right;
        top: 0;
        right: 0;
        z-index: 30;
      }
    }
  }

  .fc-col-header-cell {
    background-color: #224d82bd;
    color: #fff;
    &.fc-day-sat {
      background-color: #224d82bd;
    }
    &.fc-day-sun {
      background-color: #e73939bd;
    }
  }
  .fc-daygrid-day-events {
    position: absolute;
    z-index: -10;
  }
`;

const Button = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100px;
  border: none;
  opacity: 0.5;
  margin-right: 10px;
  cursor: pointer;
  &.on {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
  @media only screen and (max-width: 680px) {
    width: 20px;
    height: 20px;
  }
`;

const ButtonArea = styled.div`
  position: absolute;
  display: flex;
  left: 5%;
  z-index: 30;
  /* top:9px; */
  @media only screen and (max-width: 680px) {
    /* top: auto; */
    bottom: -30px;
    left: 0;
  }
`;

const MonthMove = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  button {
    font-size: 3rem;
    border: none;
    background: none;
    color: #6f7983;
    &:hover {
      color: #a7c4da;
    }
  }

  @media only screen and (max-width: 680px) {
    /* width: 20vw;
    left: 35.7vw;
    top: -1.8vh; */
  }
`;
export default Main;
