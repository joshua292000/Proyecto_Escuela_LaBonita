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
import HorariosEscuela from "../Recursos/HorariosEscuela.png";
import AsignarSecciones from "../Recursos/AsignarSecciones.png";
import AsignarSeccionProfe from "../Recursos/AsignarSeccionProfe.png";

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
          <div className="card col-sm-6 col-md-4 col-lg-3"
            id="Card_InicioEnc"
            style={{backgroundColor: "#ADE25D", borderRadius: "20px"}} 
            onClick={() => navegar("/RegistroProfesor")}>  
              <img src={RegistroFun} className="card-img-top" alt="Imagen 1" />
              <div className="card-body">
                <h5 className="card-title text-center" style={{fontSize: "25px"}}> Registrar funcionarios</h5>
              </div>
          </div>
        </div>
      )
    }
  }

  /*
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

}*/

return (
  <div>
  {" "}
  <Header />  
  <div className="card-deck d-flex justify-content-center align-items-center"> {/* Alinea horizontal y verticalmente */}
    
    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#AA98A9", borderRadius: "20px"}} 
      onClick={() => navegar("/Informacionpersonal")}> 
        <img src={Matricula} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Matrícula</h5>
        </div>
    </div> 
   

    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#F9A825", borderRadius: "20px"}} 
      onClick={() => navegar("/Constancias")}> {/* Controla el tamaño de la tarjeta */}
        <img src={Constancia} className="card-img-top" alt="Imagen 2"  />
        <div className="card-body">
        <h5 className="card-title text-center" style={{fontSize: "25px"}}>Generar Constancias</h5>
        </div>
    </div> 

    <div className="card col-sm-6 col-md-4 col-lg-3"
      id="Card_InicioEnc"
      style={{backgroundColor: "#00EBF7", borderRadius: "20px"}} 
      onClick={() => navegar("/AsistenciaEstudiantes")}>  
        <img src={Asistencia} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Control de Asistencia</h5>
        </div>
    </div>
  </div>
  <br></br>
  {/*---------------------------------------------------fila 2-----------------------------*/ }
  <div className="card-deck d-flex justify-content-center align-items-center"> {/* Alinea horizontal y verticalmente */}
   
    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#F1948A", borderRadius: "20px"}} 
      onClick={() => navegar("/Reporte")}> 
        <img src={Reporte} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Generar Reportes</h5>
        </div>
    </div> 
   

    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#5DADE2", borderRadius: "20px"}} 
      onClick={() => navegar("/ReporteComedor")}> {/* Controla el tamaño de la tarjeta */}
        <img src={ReporteComedor} className="card-img-top" alt="Imagen 2"  />
        <div className="card-body">
        <h5 className="card-title text-center" style={{fontSize: "25px"}}>Reporte de Comedor</h5>
        </div>
    </div> 

    <div className="card col-sm-6 col-md-4 col-lg-3"
      id="Card_InicioEnc"
      style={{backgroundColor: "#ADE25D", borderRadius: "20px"}} 
      onClick={() => navegar("/SubirPDF")}>  
        <img src={HorariosEscuela} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Subir Horarios</h5>
        </div>
    </div>
  </div>
  <br></br>
  {/*---------------------------------------------------fila 3-----------------------------*/ }
  <div className="card-deck d-flex justify-content-center align-items-center"> {/* Alinea horizontal y verticalmente */}
   
    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#E5F2C9", borderRadius: "20px"}} 
      onClick={() => navegar("/AsignarSeccion")}> 
        <img src={AsignarSecciones} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Asignar Secciones</h5>
        </div>
    </div> 
   

    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#70F8BA", borderRadius: "20px"}} 
      onClick={() => navegar("/AsignarSeccionProfe")}> {/* Controla el tamaño de la tarjeta */}
        <img src={AsignarSeccionProfe} className="card-img-top" alt="Imagen 2" style={{width:"265px"}}  />
        <div className="card-body">
        <h5 className="card-title text-center" style={{fontSize: "25px"}}>Asignar Secciones a Profesores</h5>
        </div>
    </div> 

    <div className="card col-sm-6 col-md-4 col-lg-3"
      id="Card_InicioEnc"
      style={{backgroundColor: "#B78DE6", borderRadius: "20px"}} 
      onClick={() => navegar("/RegistroProfesor")}>  
        <img src={RegistroFun} className="card-img-top" alt="Imagen 1" style={{width:"308px"}} />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Registrar funcionarios</h5>
        </div>
    </div>
  </div>
  <br></br>
</div>
  
);
}; 