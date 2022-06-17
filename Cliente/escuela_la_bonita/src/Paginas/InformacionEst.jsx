import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
export default function Inicio() {
    return (
      <div>
        <h1>Información del estudiante</h1>
        <label>:</label>
        <TXT_info name="txt_" id="txt_cedula"></TXT_info>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }