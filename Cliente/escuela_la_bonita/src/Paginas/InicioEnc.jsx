import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Estilos.css"
import ActividadesDiarias from '../Recursos/ActividadesDiarias.png';
import PerfilProfesores from "../Recursos/PerfilProfesores.png";
import HorariosEscuela from "../Recursos/HorariosEscuela.png";
import { Header } from "../Componentes/Cabecera";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InicioEnc() {  
  const navegar = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  
  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };


return (
  <div>
  {" "}
  <Header /> 
  <div className="card-deck d-flex justify-content-center align-items-center"> {/* Alinea horizontal y verticalmente */}
    <div className="card col-sm-6 col-md-4 col-lg-3" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{backgroundColor: "#EB5160", boxShadow: isHovered ? "1px 1px 6px 5px #ffffff" : "none"}} 
      onClick={() => navegar("/Horarios")}> {/* Controla el tamaño de la tarjeta */}
        <img src={HorariosEscuela} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
        <h5 className="card-title text-center"> Horarios de la escuela</h5>
        </div>
    </div> 

    <div className="card col-sm-6 col-md-4 col-lg-3" 
      onMouseEnter={handleMouseEnter2}
      onMouseLeave={handleMouseLeave2}
      style={{backgroundColor: "#9368B7", boxShadow: isHovered2 ? "1px 1px 6px 5px #ffffff" : "none"}} 
      onClick={() => navegar("/ActividadesDiarias")}> {/* Controla el tamaño de la tarjeta */}
        <img src={ActividadesDiarias} className="card-img-top" alt="Imagen 2"  />
        <div className="card-body">
        <h5 className="card-title text-center">Actividades Diarias</h5>
        </div>
    </div>

    <div className="card col-sm-6 col-md-4 col-lg-3"
      onMouseEnter={handleMouseEnter3}
      onMouseLeave={handleMouseLeave3}
      style={{backgroundColor: "#ADE25D", boxShadow: isHovered3 ? "1px 1px 6px 5px #ffffff" : "none"}} 
      onClick={() => navegar("/Profesores")}>  
        <img src={PerfilProfesores} className="card-img-top" alt="Imagen 1" />
        <div className="card-body">
          <h5 className="card-title text-center"> Profesores</h5>
        </div>
    </div>
  </div>
  <br></br>
</div>
  
);
};