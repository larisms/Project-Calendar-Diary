import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ShowModal from "../components/Modal";
import { apis } from "../shared/axios";

const Main = (props) => {
  const [list, setList] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [target_date, setTarget_date] = React.useState();

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

  console.log(list);

  const modalOpen = (info) => {
    setTarget_date(info.dateStr);
    console.log(target_date);
    setVisible(true);
  };

  const titleFormat = {
    year: "numeric",
    month: "long",
  };

  return (
    <React.Fragment>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        headerToolbar={{
          left: "",
          center: "title",
          right: "prevYear,prev,today,next,nextYear",
        }}
        titleFormat={titleFormat}
        events={list}
        dateClick={modalOpen}
      />
      <ShowModal
        date={target_date}
        visible={visible}
        onHide={() => setVisible(false)}
      />
    </React.Fragment>
  );
};

export default Main;
