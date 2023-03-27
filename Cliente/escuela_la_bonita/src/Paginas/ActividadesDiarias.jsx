import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

import 'whatwg-fetch';
import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import CustomStore from 'devextreme/data/custom_store';
import moment from 'moment';
import 'moment/locale/es';
import {IntlProvider} from 'react-intl';
import timeZoneUtils from 'devextreme/time_zone_utils';


export function ActividadesDiarias() {

  const currentDate = new Date(2023, 2, 7);
 

  function getData(_, requestOptions) {
  const PUBLIC_KEY = 'AIzaSyCUONoCX5-J_IrTg_RJQKRwzx82GMK0ots';
    const CALENDAR_ID = 'c446f61d7f99a5fe521a188a7ec7563438509cfdaa48ba2941b061e896baed04@group.calendar.google.com';
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
  
    return fetch(dataUrl, requestOptions).then(
      (response) => response.json(),
    ).then((data) => data.items);
  }
  
  const dataSource = new CustomStore({
    load: (options) => getData(options, { showDeleted: false }),
  });
  
  const views = ['day', 'workWeek', 'month'];
  const lenguage = "es";

  //const { timeZone } = this.state;


  return (
    <div>
      {" "}
      <Header />
      <div>
        <div>
        <React.Fragment>
        
        <div className="long-title">
          <h3>Calendario de actividades</h3>
        </div>
        <IntlProvider locale="es">
        <Scheduler
          lenguage={lenguage}
          dataSource={dataSource}
          views={views}
          defaultCurrentView="month"
          defaultCurrentDate={currentDate}
          height={500}
          //startDayHour={7}
          editing={false}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          //timeZone={timeZone}
          //timeZone="America/Costa_Rica"
          />
        </IntlProvider>
        
      </React.Fragment>
      </div>
      </div>
    </div>
  );
}
 