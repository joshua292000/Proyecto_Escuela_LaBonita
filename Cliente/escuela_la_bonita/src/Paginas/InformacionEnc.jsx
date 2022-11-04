import { ButtonSiguiente, TXT_info, InfoPersonal,InfoEncargado } from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { agregarInfoPersonal } from "../Persistencia/PersonaServive";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import "../Estilos.css";
export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      <div className="Div">
        <span className="titleBlack">Información del Encargado</span>
        <InfoPersonal setState = {setState} state = {state} quien="encargado"/> 
        <InfoEncargado setState = {setState} state = {state}/>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente" />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
      // <InfoEncargado setState = {setState} state = {state}/>
      //setState = {setState} state = {state} quien="encargado"
    );
  }
  