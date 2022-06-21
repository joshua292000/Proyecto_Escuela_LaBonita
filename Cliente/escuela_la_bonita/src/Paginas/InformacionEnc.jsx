import { ButtonSiguiente, TXT_info, InfoPersonal,InfoEncargado } from "../Componentes/Utils";
import {useContext} from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import 'primeicons/primeicons.css';
export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
    return (
      
      <div>
        <h1>Información del Encargado</h1>
        <InfoPersonal setState = {setState}/> 
        <InfoEncargado></InfoEncargado>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente " />
      </div>
      
    );
  }
  