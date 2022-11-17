import { ButtonSiguiente} from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { InfoEncargado } from "../Componentes/InforPersEnc";
import "../Estilos.css";

export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      <div className="Div">
        <span className="titleBlack">Información del Encargado</span>
        <InfoEncargado/>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente" />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
    );
  }