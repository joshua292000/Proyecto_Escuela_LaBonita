import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
export default function Inicio() {
    return (
      <div>
        <h1>Información del Encargado</h1>
        <div>

          <table width="85%">
          <tr>
                <th><label>Cédula:</label><br/></th>
                <th></th>
                <th><label>Fecha Nacimiento:</label><br /></th>
            </tr>
            <tr>
                <th><TXT_info name="txt_" id="txt_cedula"></TXT_info><br /></th>
                <th><Button label="Buscar" loading loadingIcon="pi pi-spin pi-sun"  /><br /><br /></th>
                <th><input type="date" name="fnacimiento" id="fnacimiento"></input><br /><br /></th>  
            </tr>
            <tr>
                <th><label>Primer Nombre:</label><br/></th>
                <th><label>Segundo Nombre:</label><br/></th>
                <th><label>Primer Apellido:</label><br/></th>
                <th><label>Segundo Apellido:</label><br/></th>
            </tr>
            <tr>
                <th><TXT_info name="txt_Pnombre" id="txt_Pnombre"></TXT_info><br /></th>
                <th><TXT_info name="txt_SNombre" id="txt_SNombre"></TXT_info><br /></th>
                <th><TXT_info name="txt_PApellido" id="txt_PApellido"></TXT_info><br /></th> 
                <th><TXT_info name="txt_SApellido" id="txt_SApellido"></TXT_info><br /></th>   
            </tr>
            <tr>
                <th><label>Contacto:</label><br /></th>
            </tr>
            <tr>
                <th></th>
                <th><label>Correo Electronico:</label><br /></th>
            </tr>
            <tr>
                <th></th>
                <th><TXT_info name="txt_CElectronico" id="txt_CElectronico"></TXT_info><br /></th>
                  
            </tr>
            <tr>
                <th></th>
                <th><label>Número de Teléfono:</label><br /></th>
            </tr>
            <tr>
                <th></th>
                <th><TXT_info name="txt_NumTelefono" id="txt_NumTelefono"></TXT_info><br /></th>
            </tr>
            <tr>
                <th><label>Dirección:</label><br/></th>
            </tr>
            <tr>
                <th></th>
                <th><label>Provincia:</label><br/></th>
                <th><label>Cantón:</label><br /></th>
                <th><label>Distrito:</label><br /></th>
            </tr>
            <tr>
                <th></th>
                <th><TXT_info name="txt_Provincia" id="txt_Provincia"></TXT_info><br /></th>
                <th><TXT_info name="txt_Canton" id="txt_Canton"></TXT_info><br /></th>
                <th><TXT_info name="txt_Distrito" id="txt_Distrito"></TXT_info><br /></th>   
            </tr>
            <tr>
                
                <th>
                  <div >
                  <label>Estado Civil:</label>
                    <select name="EstadoCivil" id="EstadoCivil">
                        <option value="S">Soltero(a)</option>
                        <option value="C">Casado(a)</option>
                        <option value="U">Unión libre</option>
                        <option value="D">Divorciado(a)</option>
                        <option value="V">Viudo(a)</option>
                        <option value="E">Separado(a)</option>
                      </select>
                  </div>
                </th>
                <th></th>
                <th>
                    <label>Sexo:</label>
                    
                </th>
                <th>
                    <input type="radio" id="hombre" name="sexoest" value="hombre"></input>
                    <label for="hombre">Hombre</label>
                        <input type="radio" id="mujer" name="sexoest" value="Mujer"></input>
                        <label for="mujer">Mujer</label>
                    </th>
            </tr>
            <tr>
                <th><label>Ocupación:</label></th>
                <th><label>Lugar de Trabajo:</label></th>
            </tr>
            <tr>
                <th> <TXT_info name="txt_Ocupación" id="txt_Ocupación"></TXT_info><br /></th>
                <th><TXT_info name="txt_LTrabajo" id="txt_LTrabajo"></TXT_info><br /></th>   
            </tr>
            <tr>
                <th>
                    <div >
                      <label>Parentesco:</label><br />
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
                </th>
                <th>
                   <div >
                    <label>Escolaridad:</label><br />
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
                </th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th><label>Vive con la (el) estudiante:</label><br /></th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th> 
                  <input type="radio" id="SI" name="viveest" value="Si"></input>
                  <label for="Si">Si</label><br></br>
                  <input type="radio" id="No" name="viveest" value="No"></input>
                  <label for="No">No</label><br></br><br />
                </th>
            </tr>
          </table>
      </div>
        
        

        
        <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>
      </div>
    );
  }
  