import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
export default function Inicio() {
    return (
      <div>
        <h1>Información del Encargado</h1>
        <div>

          <table width="55%">
            
            <tr>
                <td><label>Contacto:</label></td>
                <td></td>
                <td>
                    <label >Informacion</label><br></br>
                    <label > Laboral:</label>
                </td>
            </tr>
            <tr>
                <td></td>
                <td><label>Correo Electronico:</label><br /></td>
                <td></td>
                <td><label>Ocupación:</label></td>
            </tr>
            <tr>
                <td></td>
                <td><TXT_info name="txt_CElectronico" id="txt_CElectronico"></TXT_info><br /></td>
                <td></td>
                <td> <TXT_info name="txt_Ocupación" id="txt_Ocupación"></TXT_info><br /></td>
                  
            </tr>
            <tr>
                <td></td>
                <td><label>Número de Teléfono:</label><br /></td>
                <td></td>
                <td><label>Lugar de Trabajo:</label></td>
            </tr>
            <tr>
                <td></td>
                <td><TXT_info name="txt_NumTelefono" id="txt_NumTelefono"></TXT_info><br /></td>
                <td></td>
                <td><TXT_info name="txt_LTrabajo" id="txt_LTrabajo"></TXT_info><br /></td> 
            </tr>
                <td><label>Parentesco:</label></td>
                <td></td>
                <td><label>Escolaridad:</label></td>
            <tr>
                <td></td>
                <td>
                    <div >
                      <select name="Parentesco" id="Parentesco">
                        <option value="Madre">Madre</option>
                        <option value="Abuelo">Abuelo(a)</option>
                        <option value="Tío">Tío(a)</option>
                        <option value="Hermano">Hermano(a)</option>
                        <option value="Madrastra">Madrastra</option>
                        <option value="Padre">Padre</option>   
                        <option value="Padrastro">Padrastro</option> 
                        <option value="EncargadoLegal">Encargad(a) legal</option>
                      </select>
                    </div>
                </td>
                <td></td>
                <td>
                   <div >
                    <select name="Escolaridad" id="Escolaridad">
                      <option value="Ninguna">Ninguna</option>
                      <option value="Primaria incompleta">Primaria incompleta</option>
                      <option value="Primaria completa">Primaria completa</option>
                      <option value="Secundaria incompleta">Secundaria incompleta</option>
                      <option value="Secundaria completa">Secundaria completa</option>
                      <option value="Técnico profesional">Técnico profesional</option>   
                      <option value="Universitaria">Universitaria</option> 
                    </select>
                    </div>
                </td>
            </tr>
            <tr></tr>
            <tr>
                <td><label>Vive con la (el) estudiante:</label><br /></td>
            </tr>
            <tr>
                <td></td>
                <td> 
                  <input type="radio" id="SI" name="viveest" value="Si"></input>
                  <label for="Si">Si</label><br></br>
                  <input type="radio" id="No" name="viveest" value="No"></input>
                  <label for="No">No</label><br></br><br />
                </td>
            </tr>
          </table>
      </div>
        
        

        
        <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }
  