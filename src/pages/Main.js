import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ShowModal from "../components/Modal";
import styled from "styled-components";
import { apis } from "../lib/axios";

const Main = (props) => {
  const [list, setList] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [target_date, setTarget_date] = React.useState();
  let red_list = list.filter((event) => event.color === "red");
  let brown_list = list.filter((event) => event.color === "brown");
  let green_list = list.filter((event) => event.color === "red");
  let blue_list = list.filter((event) => event.color === "blue");
  let gray_list = list.filter((event) => event.color === "gray");
  let purple_list = list.filter((event) => event.color === "purple");

  console.log(red_list);

  //서버로 부터 데이터 받아오기
  useEffect(() => {
    apis
      .getPost()
      .then((res) => {
        const post = res.data;
        setList(...list, post);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //Modal창 열기 함수
  const modalOpen = (info) => {
    setTarget_date(info.dateStr);
    console.log(target_date);
    setVisible(true);
    apis.getPost("http://localhost:4000/?date=target_date");
  };

  //캘린더 제목 설정
  const titleFormat = {
    year: "numeric",
    month: "long",
  };

  return (
    <React.Fragment>
      <Container>
        <ButtonArea>
          <Button
            className=""
            tagColor={"#DD6262"}
            style={{
              background: "red",
            }}
            onClick={() => {
              setList(red_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#B07255"}
            style={{
              background: "brown",
            }}
            onClick={() => {
              setList(brown_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#6C9D68"}
            style={{
              background: "green",
            }}
            onClick={() => {
              setList(green_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#6A96B8"}
            style={{
              background: "blue",
            }}
            onClick={() => {
              setList(blue_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#818D90"}
            style={{
              background: "gray",
            }}
            onClick={() => {
              setList(gray_list);
            }}
          ></Button>
          <Button
            className=""
            tagColor={"#9F70BC"}
            style={{
              background: "purple",
            }}
            onClick={() => {
              setList(purple_list);
            }}
          ></Button>
        </ButtonArea>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: "today",
            center: "title",
            right: "prev,next",
          }}
          titleFormat={titleFormat}
          events={list}
          dateClick={modalOpen}
        />
      </Container>
      <ShowModal
        date={target_date}
        visible={visible}
        onHide={() => setVisible(false)}
      />
    </React.Fragment>
  );
};

const Container = styled.div`
  height: 100%;
  width: 90%;
  margin: auto;
  margin-top: 50px;
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
`;

const ButtonArea = styled.div`
  position: absolute;
  display: flex;
  top: 55px;
  left: 200px;
`;
export default Main;
