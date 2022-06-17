import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
export default function Inicio() {
    return (
      <div>
        <h1>Información del estudiante</h1>
        <label>Cédula:</label>
        <TXT_info name="txt_" id="txt_cedula"></TXT_info>
        <label>Primer Nombre:</label>
        <TXT_info name="txt_Pnombre" id="txt_Pnombre"></TXT_info>
        <label>Segundo Nombre:</label>
        <TXT_info name="txt_SNombre" id="txt_SNombre"></TXT_info>
        <label>Primer Apellido:</label>
        <TXT_info name="txt_PApellido" id="txt_PApellido"></TXT_info>
        <label>Segundo Apellido:</label>
        <TXT_info name="txt_SApellido" id="txt_SApellido"></TXT_info>
        <label>Fecha Nacimiento:</label><br />
        <input type="date" name="fnacimiento" id="fnacimiento"></input><br /><br />
        <label>Estado civil:</label><br />
        <div>
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Solter@</label><br /><br />
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Casad@</label>
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Unión libre</label><br /><br />
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Divorciad@</label><br /><br />
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Viud@</label><br /><br />
          <input type="radio" name="fnacimiento" id="fnacimiento"></input>
          <label for="dewey">Separad@</label><br /><br />
        </div>
        
        <label>Genero:</label><br />
        <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }