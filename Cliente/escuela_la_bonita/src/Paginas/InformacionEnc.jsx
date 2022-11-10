import { ButtonSiguiente} from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { InfoEncargado, InfoPersonal } from "../Componentes/InfomacionEnc";
import "../Estilos.css";

export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      <div className="Div">
        <span className="titleBlack">Información del Encargado</span>
        <InfoPersonal setState = {setState} state = {state}/> 
        <InfoEncargado setState = {setState} state = {state}/>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente" />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
    );
  }
  