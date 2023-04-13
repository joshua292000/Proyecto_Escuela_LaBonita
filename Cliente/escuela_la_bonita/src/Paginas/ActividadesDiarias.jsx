import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import React, { useEffect, useState } from "react";
import {
  Appointments,
  DateNavigator,
  Toolbar,
  TodayButton,
  Scheduler,
  DayView,
  MonthView,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import "moment/locale/es";
import { Paper } from "@material-ui/core";
import { ViewState } from '@devexpress/dx-react-scheduler';

export const ActividadesDiarias = () => {
  const [calendarItems, setCalendarItems] = useState(null);

  const currentDate = '2023-02-07';
  const PUBLIC_KEY = "AIzaSyCUONoCX5-J_IrTg_RJQKRwzx82GMK0ots";
  const CALENDAR_ID =
    "c446f61d7f99a5fe521a188a7ec7563438509cfdaa48ba2941b061e896baed04@group.calendar.google.com";
  const API_URL = "https://www.googleapis.com/calendar/v3/calendars/";
  const views = ["day", "workWeek", "month"];
  const lenguage = "es";
 

  const getData = async () => {
    const response = await fetch(
      `${API_URL}${CALENDAR_ID}/events?key=${PUBLIC_KEY}`
    );
    const data = await response.json();
    console.log(data);
    const items = data?.items.map((item) => {
      console.log(`${item.start.dateTime.slice(0,19)}.000Z`)
      return {
        title: item.summary,
        startDate: new Date(`${item.start.dateTime.slice(0,19)}.000Z`),
        endDate: new Date(`${item.end.dateTime.slice(0,19)}.000Z`),
        id: item.id,
      };
    });
    console.log('items:',items);

    setCalendarItems(items);
  };
  useEffect(() => {
    getData();
  }, []);

  
  return (
    <div>
      <Header />
      {!calendarItems ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <>
            <div className="long-title">
              <h3> Calendario de actividades </h3>
            </div>
            <Paper>
              <Scheduler
                // lenguage={lenguage}
                data={calendarItems}
                locale={lenguage}
                views={views}
                // defaultCurrentView="month"
                // defaultCurrentDate={currentDate}
                height={600}
   
              >
               <ViewState
        //currentDate={currentDate}
        defaultCurrentDate="2023-02-07"
        defaultCurrentViewName="Month"
      />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
      <MonthView />
          <DayView  />
      <Toolbar />
      <DateNavigator />
      <TodayButton  />
      <ViewSwitcher />
      <Appointments />
               
              </Scheduler>
            </Paper>
          </>
        </div>
      )}
    </div>
  );
};
