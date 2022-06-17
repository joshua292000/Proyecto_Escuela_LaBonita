import { ButtonSiguiente, TXT_info, dt_Fechanacimiento } from "../Componentes/Utils";

export default function Inicio() {
    return (
      <div>
        <h1>Información personal del estudiante</h1>
        <label>Cédula:</label>
        <TXT_info name="txt_cedula" id="txt_cedula"></TXT_info>
        <label>Primer nombre:</label>
        <TXT_info name="txt_pnombre" id="txt_pnombre"></TXT_info>
        <label>Segundo nombre:</label>
        <TXT_info name="txt_snombre" id="txt_snombre"></TXT_info>
        <label>Primer apellido:</label>
        <TXT_info name="txt_papellido" id="txt_papellido"></TXT_info>
        <label>Segundo apellido:</label>
        <TXT_info name="txt_papellido" id="txt_papellido"></TXT_info>
        <label>Fecha nacimiento:</label>
        <input type="date" name="fnacimiento" id="fnacimiento"></input><br></br>
        <label>Sexo:</label>
        <input type="radio" id="hombre" name="sexoest" value="soltero"></input>
          <label for="hombre">Hombre</label><br></br>
          <input type="radio" id="mujer" name="sexoest" value="Mujer"></input>
          <label for="mujer">Mujer</label><br></br>
        <ButtonSiguiente dir="informacionencargados" nom="Siguiente" css="button_Siguiente"/>
      </div> 
    );
  }