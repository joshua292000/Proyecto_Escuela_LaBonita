import React, { Component, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import { Header } from "../Componentes/Cabecera";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Obtener_Actividades_Diarias } from "../Persistencia/EncargadoService";
import Swal from 'sweetalert2';
import "../Estilos.css";

require('moment/locale/es.js');

const localizer = momentLocalizer(moment);

//array de eventos
const myEventsList= [{
    title: "today",
    description: "es la puta hostia",
    start: new Date('2023-06-28T06:00:00.000Z'),
    end: new Date('2023-06-28T06:00:00.000Z')
  },
  {
    title: "string",
     start: new Date('2023-05-05 12:22:00'),
    end: new Date('2023-05-05 13:42:00')
  }]
export const ActividadesDiarias = () => {

    const [Actividades, setActividades] = useState([]);
   

    useEffect(() => {
        const ObtenerDatos = async ()=>{
          const res = await Obtener_Actividades_Diarias()
          setActividades(res)
          
          
        }
        ObtenerDatos(); 
        
  },[]);
  
 
  

    return (
    <div>
      {" "}
      <Header />
        <div>
            <Calendar
              views={["month", "work_week", "day" ]}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={Actividades}
             

              style={{backgroundColor: "white", height: "100vh"}}
              onSelectEvent={(event) => Swal.fire(event.title, event.description)}

              eventPropGetter={(event, start, end, isSelected) => ({
                event,
                start,
                end,
                isSelected,
                style: { backgroundColor: "green", height: "70px" }
              })}
              
              messages={{
                      next: "siguiente mes",
                      previous: "mes anterior",
                      today: "Hoy",
                      month: "Mes",
                      work_week: "Semana",
                      day: "Día"
                    }}
            />
          </div>
          </div>
          );
          }

