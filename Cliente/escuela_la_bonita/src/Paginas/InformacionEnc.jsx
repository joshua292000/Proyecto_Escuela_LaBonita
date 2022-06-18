import { ButtonSiguiente, TXT_info, InfoPeronal,InfoEncargado } from "../Componentes/Utils";
import 'primeicons/primeicons.css';
export default function Inicio() {
    return (
      <div>
        <h1>Información del Encargado</h1>
        <InfoPeronal></InfoPeronal>
        <InfoEncargado></InfoEncargado>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }
  