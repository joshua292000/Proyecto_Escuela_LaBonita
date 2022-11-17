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

export default function Inicio() {
  const cookies = new Cookies();
  const navegar = useNavigate();

  const VerEle = () => {

    const IdDirector = cookies.get('Rol_Id');
    console.log("ver id", IdDirector)
    if (IdDirector === "1") {
      console.log("ver ele 2", cookies.get('Rol_Id'))
      return (
        <div id="RegistrarFuncionarios">
          <img src={RegistroFun} alt="Escuela Rodrigo Facio Brenes" width="150%"
            onClick={() => navegar("/RegistroProfesor")}
          />
            <h3>Registrar funcionario</h3>
          
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
        <div className="container" style={{ paddingLeft:'5%', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}  >
          <br />
          <div className="row justify-content-md-center" >
            <div className="col-sm ">
              <div id="Matricula">
                <img
                  src={Matricula}
                  alt="Matricula"
                  width="80%"
                  onClick={() => navegar("/Informacionpersonal")}
                />
                <h3>Matrícula</h3>
              </div>
            </div>
            <div className="col-sm">
              <div id="Constancia">
                <img
                  src={Constancia}
                  alt="Constancias"
                  width="80%"
                  onClick={() => navegar("/Constancias")}
                />
                <h3>Generar constancia</h3>
              </div>
            </div>
            <div className="col-sm">
              <div id="Asistencia">
                <img
                  src={Asistencia}
                  alt="Asistencia"
                  width="80%"
                  onClick={() => navegar("/AsistenciaEstudiantes")}
                />
                <h3>Control de asistencia</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm">
              <div id="Reporte">
                <img src={Reporte} alt="Escuela Rodrigo Facio Brenes"  width="80%"
                  onClick={() => navegar("/Reporte")}
                />
                <h3>Generar reporte</h3>
              </div>
            </div>
            <div className="col-sm">
              <div id="ReporteComedor">
                <img src={ReporteComedor} alt="Escuela Rodrigo Facio Brenes"  width="80%"
                  onClick={() => navegar("/ReporteComedor")}
                />
                <h3>Generar reporte de comedor</h3>
              </div>
            </div>
            <div className="col-sm">
              <VerEle></VerEle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}