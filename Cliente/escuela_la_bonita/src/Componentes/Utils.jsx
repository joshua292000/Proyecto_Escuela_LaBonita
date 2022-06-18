import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
export function ButtonSiguiente(dir){
    
    const navegar = useNavigate();
    const link = ()=>{
        navegar("/"+dir.dir);
    }
    return(
        <div>
         <button type="button" className={dir.css} onClick={link}>{dir.nom}</button><br />
        </div>
       );
}

export function TXT_info(){
return(
     <div>
    <input type="text" required></input><br></br>
    </div>
)
}
export function InfoPeronal(){
    return(
         <div>
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
        </div>
    )
}

export function InfoEncargado(){
    return(
         <div>
            <table>
                <tr>
                    <td>
                        <label >Informacion Laboral:</label>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><label>Ocupación:</label></td>
                    <td><label>Lugar de Trabajo:</label></td>
                </tr>
                <tr>
                    <td></td>
                    <td> <TXT_info name="txt_Ocupación" id="txt_Ocupación"></TXT_info><br /></td>
                    <td><TXT_info name="txt_LTrabajo" id="txt_LTrabajo"></TXT_info><br /></td> 
                </tr>
                <tr>
                    <td><label>Contacto:</label></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><label>Correo Electronico:</label><br /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><TXT_info name="txt_CElectronico" id="txt_CElectronico"></TXT_info><br /></td>
                    <td></td>
                    
                    
                </tr>
                <tr>
                    <td></td>
                    <td><label>Número de Teléfono:</label><br /></td>
                    <td></td>
                    
                </tr>
                <tr>
                    <td></td>
                    <td><TXT_info name="txt_NumTelefono" id="txt_NumTelefono"></TXT_info><br /></td>
                    <td></td>
                    
                </tr>
                <tr>
                
                </tr>
                <tr>
                    <td><label>Parentesco:</label></td>
                    <td></td>
                    <td><label>Escolaridad:</label></td>
                </tr>
                
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
                <td></td>
                    <td><label>Vive con la (el) estudiante:</label><br /></td>
                </tr>
                <tr>
                    <td></td>
                    <td> 
                    <input type="radio" id="SI" name="viveest" value="Si"></input>
                    <label for="Si">Si</label>
                    <input type="radio" id="No" name="viveest" value="No"></input>
                    <label for="No">No</label><br></br><br />
                    </td>
                </tr>
            </table>
        </div>
    )
}

