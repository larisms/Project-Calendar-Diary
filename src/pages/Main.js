import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {apis} from "../lib/axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {formatDate} from "@fullcalendar/common";

import Detail from "../components/Detail";
import Add from "../components/Add";
import Header from "../components/Header";

import {detailShow} from "../redux/modules/show";
import {actionCreators as calendarAction} from "../redux/modules/calendar";
import showError from "../redux/modules/error";
import {history} from "../redux/configureStore";

const Main = (props) => {
    const dispatch = useDispatch();
    const Detail_control = useSelector((state) => state.show.detail);
    const Add_control = useSelector((state) => state.show.add);
    const new_list = useSelector((state) => state.calendar.list);
    const edit_list = useSelector((state) => state.calendar.editList);
    const is_get = useSelector((state) => state.calendar.is_get);
    const delCount = useSelector((state) => state.detail.delCount);

    const [postList, setList] = React.useState();
    const [target_date, setTarget_date] = React.useState();

    const red_list = new_list.filter((event) => event.color === "#DD6262");
    const brown_list = new_list.filter((event) => event.color === "#B07255");
    const green_list = new_list.filter((event) => event.color === "#6C9D68");
    const blue_list = new_list.filter((event) => event.color === "#6A96B8");
    const gray_list = new_list.filter((event) => event.color === "#818D90");
    const purple_list = new_list.filter((event) => event.color === "#9F70BC");

    // console.log(postList); console.log(new_list);
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
                minute: "2-digit"
            }
        );
        // apis   .getPostAX({ params: { date: _today } })   .then((res) => {     const
        // post = res.data;     setList(...list, post);   })   .catch((err) => {
        // console.error(err);   });
        dispatch(calendarAction.setCalendarMW(_today));
        console.log(":::getCalendar is updated:::");
    }, [edit_list, delCount]);

    console.log("[useEffect] newlist:::", new_list);

    React.useEffect(() => {
        setList(new_list);
        console.log(":::setList = new_list is updated:::");
    }, [is_get]);

    // Modal창 열기 함수 const modalOpen = (info) => {   setTarget_date(info.dateStr);
    // console.log(target_date);   setVisible(true);
    // apis.getPost("http://localhost:4000/?date=target_date"); }; 캘린더 제목 설정
    const titleFormat = {
        year: "numeric",
        month: "long"
    };

    //캘린더 전월로 이동하기 버튼
    const calendarRef = React.useRef();
    const PrevButton = () => {
        let calendarApi = calendarRef
            .current
            .getApi();
        calendarApi.prev();
        const now_month = formatDate(calendarApi.currentDataManager.data.currentDate, {
            timeZone: "Asia/Seoul",
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
        console.log(now_month);
        apis
            .getPostAX({
                params: {
                    date: now_month
                }
            })
            .then((res) => {
                if (res.status >= 400) {
                    showError(res.status, res.data.msg);
                    history.push('/error');
                    return null;
                }
                const post_list = res.data;
                setList(post_list);
            });
    };
    //캘린더 익월로 이동하기 버튼
    const NextButton = () => {
        let calendarApi = calendarRef
            .current
            .getApi();
        calendarApi.next();
        const now_month = formatDate(calendarApi.currentDataManager.data.currentDate, {
            timeZone: "Asia/Seoul",
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
        console.log(now_month);
        apis
            .getPostAX({
                params: {
                    date: now_month
                }
            })
            .then((res) => {
                const post_list = res.data;
                console.log(post_list);
                setList(post_list);
            });
    };

    const addClass = (e) => {
        const siblings = t => [...t.parentElement.children].filter(e => e != t);
        siblings(e.target).map((x)=>{
            const class_ = String(x.classList[0]+" "+x.classList[1])
            if(x.classList[2] === "on"){
                x.setAttribute('class',class_)
            }
        });
        e.target.classList.add("on");
        
    }

    return (
        <React.Fragment>
            {
                Detail_control
                    ? <Detail date={target_date}/>
                    : null
            }
            {
                Add_control
                    ? <Add date={target_date}/>
                    : null
            }
            <Header/>
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
                            background: "#DD6262"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(red_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#B07255"}
                        style={{
                            background: "#B07255"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(brown_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#6C9D68"}
                        style={{
                            background: "#6C9D68"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(green_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#6A96B8"}
                        style={{
                            background: "#6A96B8"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(blue_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#818D90"}
                        style={{
                            background: "#818D90"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(gray_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#9F70BC"}
                        style={{
                            background: "#9F70BC"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(purple_list);
                        }}></Button>
                    <Button
                        className=""
                        tagColor={"#9F70BC"}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid black"
                        }}
                        onClick={(e) => {
                            addClass(e);
                            setList(new_list);
                        }}></Button>
                </ButtonArea>

                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="ko"
                    headerToolbar={{
                        left: "",
                        center: "title",
                        right: "today"
                    }}
                    titleFormat={titleFormat}
                    events={postList}
                    dateClick={goToDetail}/>
            </Container>
        </React.Fragment>
    );
};

const Container = styled.div `
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

const Button = styled.div `
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

const ButtonArea = styled.div `
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

const MonthMove = styled.div `
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
