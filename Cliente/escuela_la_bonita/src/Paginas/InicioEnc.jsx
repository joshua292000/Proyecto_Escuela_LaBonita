import { ButtonSiguiente } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Estilos.css"
import Cookies from "universal-cookie";
import Constancia from '../Recursos/Constancia.png';
import Asistencia from "../Recursos/Asistencia.png";
import Matricula from "../Recursos/Matricula.png";
import Reporte from '../Recursos/reporte.png'
import RegistroFun from '../Recursos/RegistrarFuncionario.png'
import ReporteComedor from '../Recursos/reporteComedor.png'
import { Header } from "../Componentes/Cabecera";
import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { within } from "@testing-library/react";
import { Tooltip } from 'primereact/tooltip';
import 'whatwg-fetch';
import Scheduler from 'devextreme-react/scheduler';
import CustomStore from 'devextreme/data/custom_store';

export function InicioEnc() {
  const cookies = new Cookies();
  const navegar = useNavigate();
  const header2 = (
    <img alt="Card" src="images/usercard.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  );
  const footer = (
    <span>
      {/*<Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />*/}
    </span>
  );
  const VerEle = () => {

    const IdDirector = cookies.get('Rol_Id');
    console.log("ver id", IdDirector)
    if (IdDirector === "1") {
      console.log("ver ele 2", cookies.get('Rol_Id'))
      return (
        <div>
          <Tooltip target=".Funcionarios" position="bottom" mouseTrack mouseTrackLeft={10}>
                  <label>Sistema de registro y actualización de funcionarios</label>
          </Tooltip>

          <Card
            className="Funcionarios"
            id="RegistrarFuncionarios"
            style={{ width: '20em' }}
            header={<img alt="Card" src={RegistroFun} />}
            onClick={() => navegar("/RegistroProfesor")}>
            <h3>Registrar funcionarios</h3>
          </Card>
        </div>
      )
    }
  }

  return (
    <div>
      {" "}
      <Header />
      <div className="Div">
        <h1>Página de inicio</h1>
        <div className="container" style={{ paddingLeft: '5%', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}  >
          <br />
          <div className="row " >
            <div className="col ">
              <Tooltip target=".Matricula2" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Horarios de la escuela</label>
              </Tooltip>

              <Card
                className="Matricula2"
                id="Matricula"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Matricula} />}
                onClick={() => navegar("/Horarios")}>
                <h3>Horarios</h3>
              </Card>
            </div>
            <div className="col">
              <Tooltip target=".Constancia" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Actividades diarias de la escuela</label>
              </Tooltip>

              <Card
                className="Constancia"
                id="Constancia"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Constancia} />}
                onClick={() => navegar("/ActividadesDiarias")}>
                <h3>Actividades Diarias</h3>
              </Card>

            </div>

            </div>  
        </div>
      </div>
    </div>
  );

}