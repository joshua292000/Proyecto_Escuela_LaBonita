import { ButtonSiguiente,InfoPersonal } from "../Componentes/Utils";
import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import "../Estilos.css";

export default function Inicio() {
  const [state, setState] = useContext(infoEstudiante);
    return (
      <div className="Div">
        <span className="titleBlack">Información personal del estudiante</span>
        <InfoPersonal setState={setState} state ={state} quien="estudiante"/>
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
        <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente" enc="" idEncar={state.idEncargado}/> 
       
      </div> 
    );
  }

  //<ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>
  // <button type="button" onClick={()=>AgregarInfoPersonal({value : state})}></button><br />