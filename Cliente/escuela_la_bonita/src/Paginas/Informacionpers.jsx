import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
export default function Inicio() {
    return (
      <div>
        <h1>Información personal del estudiante</h1>
        <label>Cédula:</label>
        <TXT_info name="txt_cedula" id="txt_cedula"></TXT_info>
        <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }