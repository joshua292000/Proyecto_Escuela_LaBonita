import { ButtonSiguiente, TXT_info, InfoPersonal,InfoEncargado } from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { agregarInfoPersonal } from "../Persistencia/PersonaServive";
import { infoEstudiante } from "../AppContext/providerEstudiante";

export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      
      <div className="Div">
        <h1>Información del Encargado</h1>
        <InfoPersonal setState = {setState} state = {state} quien="encargado"/> 
        <InfoEncargado></InfoEncargado>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente" />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
      
    );
  }
  