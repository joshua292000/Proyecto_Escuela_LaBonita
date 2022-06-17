import { ButtonSiguiente, TXT_info, dt_Fechanacimiento } from "../Componentes/Utils";
import { Button } from 'primereact/button';

export default function Inicio() {
    return (
      <div>
        <h1>Información personal del estudiante</h1>
        <table width="40%">
        <tr>
        <td><label>Cédula:</label><TXT_info name="txt_cedula" id="txt_cedula"></TXT_info><br></br></td><br></br>
        <tr><Button label="Buscar" loading loadingIcon="pi pi-spin pi-sun"  /><br></br></tr>
        <td><label>Fecha nacimiento:</label><br></br><input type="date" name="fnacimiento" id="fnacimiento"></input><br></br><br></br></td>
        </tr>
        <tr>
        <td><label>Primer nombre:</label><TXT_info name="txt_pnombre" id="txt_pnombre"></TXT_info><br></br></td>
        <td><label>Segundo nombre:</label><TXT_info name="txt_snombre" id="txt_snombre"></TXT_info><br></br></td>
        <td><label>Primer apellido:</label><TXT_info name="txt_papellido" id="txt_papellido"></TXT_info><br></br></td>
        <td> <label>Segundo apellido:</label><TXT_info name="txt_papellido" id="txt_papellido"></TXT_info><br></br></td>
        </tr>
        <tr>
        <td><label>Provincia:</label><TXT_info name="txt_provincia" id="txt_provincia"></TXT_info><br></br></td>
        <td><label>Cantón:</label><TXT_info name="txt_canton" id="txt_canton"></TXT_info><br></br></td>
        <td><label>Distrito:</label><TXT_info name="txt_distrito" id="txt_distrito"></TXT_info><br></br></td>
        <td>
        <div>
          <br></br>
          <label>País:</label><br></br>
          <select name="País" id="País">
            <option value="CostaRica">Costa Rica</option>
            <option value="Panamá">Panamá</option>
            <option value="USA">Estados Unidos</option>
          </select>
        </div><br /><br></br></td>
        </tr>
        <td><label>Sexo:</label>
        <input type="radio" id="hombre" name="sexoest" value="soltero"></input>
        <label for="hombre">Hombre</label>
        <input type="radio" id="mujer" name="sexoest" value="Mujer"></input>
        <label for="mujer">Mujer </label><br></br><br></br></td>

        </table>
        
     
        
        
       
        
      

          
        <ButtonSiguiente dir="informacionencargados" nom="Siguiente" css="button_Siguiente"/>
      </div> 
    );
  }