import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Estilos.css"
import ActividadesDiarias from '../Recursos/ActividadesDiarias.png';
import PerfilProfesores from "../Recursos/PerfilProfesores.png";
import HorariosEscuela from "../Recursos/HorariosEscuela.png";
import { Header } from "../Componentes/Cabecera";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip, Card } from "react-bootstrap";

export default function InicioEnc() {  
  const navegar = useNavigate();

return (
  <div>
  {" "}
  <Header />  
  <div className="card-deck d-flex justify-content-center align-items-center"> {/* Alinea horizontal y verticalmente */}
    
   
    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#EB5160", borderRadius: "20px"}} 
      onClick={() => navegar("/Horarios")}> 
        <img src={HorariosEscuela} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Horarios de la escuela</h5>
        </div>
    </div> 
   

    <div className="card col-sm-6 col-md-4 col-lg-3" 
      id="Card_InicioEnc"
      style={{backgroundColor: "#9368B7", borderRadius: "20px"}} 
      onClick={() => navegar("/ActividadesDiarias")}> {/* Controla el tamaño de la tarjeta */}
        <img src={ActividadesDiarias} className="card-img-top" alt="Imagen 2"  />
        <div className="card-body">
        <h5 className="card-title text-center" style={{fontSize: "25px"}}>Actividades Diarias</h5>
        </div>
    </div> 

    <div className="card col-sm-6 col-md-4 col-lg-3"
      id="Card_InicioEnc"
      style={{backgroundColor: "#ADE25D", borderRadius: "20px"}} 
      onClick={() => navegar("/Profesores")}>  
        <img src={PerfilProfesores} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{fontSize: "25px"}}> Profesores</h5>
        </div>
    </div>

  </div>
  <br></br>
</div>
  
);
}; 