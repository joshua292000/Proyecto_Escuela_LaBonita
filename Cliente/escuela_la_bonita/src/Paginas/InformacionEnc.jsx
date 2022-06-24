import { ButtonSiguiente, TXT_info, InfoPersonal,InfoEncargado } from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import 'primeicons/primeicons.css';
import { agregarInfoPersonal } from "../Persistencia/InsertarInfoPer";

export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      
      <div>
        <h1>Información del Encargado</h1>
        <InfoPersonal setState = {setState} state = {state}/> 
        <InfoEncargado></InfoEncargado>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente " />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
      
    );
  }
  