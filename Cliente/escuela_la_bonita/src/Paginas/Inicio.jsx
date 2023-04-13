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

export default function Inicio() {
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
                <label>Sistema de matrícula de estudiantes</label>
              </Tooltip>

              <Card
                className="Matricula2"
                id="Matricula"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Matricula} />}
                onClick={() => navegar("/Informacionpersonal")}>
                <h3>Matrícula</h3>
              </Card>
            </div>
            <div className="col">
              <Tooltip target=".Constancia" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de generación de constancias de traslado y de estudiantes</label>
              </Tooltip>

              <Card
                className="Constancia"
                id="Constancia"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Constancia} />}
                onClick={() => navegar("/Constancias")}>
                <h3>Generar Constancia</h3>
              </Card>

            </div>

            <div className="col">
              <Tooltip target=".Asistencia" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de control de asistencia de los estudiantes en las aulas</label>
              </Tooltip>

              <Card
                className="Asistencia"
                id="Asistencia"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Asistencia} />}
                onClick={() => navegar("/AsistenciaEstudiantes")}>
                <h3>Control de asistencia</h3>
              </Card>
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <Tooltip target=".Reportes" position="bottom" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de generación de reportes de asistencia</label>
              </Tooltip>

              <Card
                className="Reportes"
                id="Reporte"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Reporte} />}
                onClick={() => navegar("/Reporte")}>
                <h3>Generar reporte</h3>
              </Card>
            </div>
            <div className="col">
              <Tooltip target=".ReporteComedor" position="bottom" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de generación de reportes de asistencia al comedor</label>
              </Tooltip>

              <Card
                className="ReporteComedor"
                id="ReporteComedor"
                style={{ width: '20em' }}
                header={<img alt="Card" src={ReporteComedor} />}
                onClick={() => navegar("/ReporteComedor")}>
                <h3>Reporte de comedor</h3>
              </Card>
            </div>
            <div className="col">
              <VerEle></VerEle>
            </div>

            <div className="col">
            <Card
                className="Reportes"
                id="Reporte"
                style={{ width: '20em' }}
                header={<img alt="Card" src={Reporte} />}
                onClick={() => navegar("/SubirPDF")}>
                <h3>Subir Horarios</h3>
            </Card>

            
              <Tooltip target=".ReporteComedor" position="bottom" mouseTrack mouseTrackLeft={10}>
                <label>Sistema para subir los horarios</label>
              </Tooltip>
           </div>

            {/*Agregue Julián */}

            <div className="col">
              <Tooltip target=".ReporteComedor" position="bottom" mouseTrack mouseTrackLeft={10}>
                <label>Módulo de asignación de secciones</label>
              </Tooltip>

              <Card
                className="Reportes"
                id="ReporteComedor"
                style={{ width: '20em' }}
                header={<img alt="Card" src={ReporteComedor} />}
                onClick={() => navegar("/AsignarSeccion")}>
                <h3>Asignar secciones</h3>
              </Card>
            </div>

            <div className="col">
              <Tooltip target=".ReporteComedor" position="bottom" mouseTrack mouseTrackLeft={10}>
                <label>Módulo de asignación de secciones a profesores</label>
              </Tooltip>

              <Card
                className="ReporteComedor"
                id="ReporteComedor"
                style={{ width: '20em' }}
                header={<img alt="Card" src={ReporteComedor} />}
                onClick={() => navegar("/AsignarSeccionProfe")}>
                <h3>Asignar secciones a profesores</h3>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}