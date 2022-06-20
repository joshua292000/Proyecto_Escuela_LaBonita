import { ButtonSiguiente, TXT_info, InfoPersonal,InfoEncargado } from "../Componentes/Utils";
import 'primeicons/primeicons.css';
export default function Inicio() {
    return (
      <div>
        <h1>Información del Encargado</h1>
        <InfoPersonal/> 
        <InfoEncargado></InfoEncargado>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente " />
      </div>
      
    );
  }
  