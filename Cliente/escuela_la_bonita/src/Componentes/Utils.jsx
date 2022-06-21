import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
import { useContext } from "react";
import { AppContext } from "../Context/provider";
import AgregarInfoPersonal from "../Persistencia/InsertarInfoPer";

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

export function TXT_info(pro) {
    const [state, setState] = useContext(AppContext);
    return (
      <div>
        <input
          type="text"
          value={pro.dfvalue}
          onChange={(e) => setState({ ...state, [pro.value]: e.target.value })}
          required
        ></input>
        <br></br>
      </div>
    );
  }
export function InfoPersonal(){
    const [state, setState] = useContext(AppContext);
    return(
         <div>
            <table width="40%">
            <tbody>
                    <tr>
                        <td><label>Cédula:</label> <TXT_info name="txt_cedula" id="txt_cedula" value="Cedula"></TXT_info><br></br></td><br></br>
                        <tr><Button label="Buscar"  /><br></br></tr>
                        <td><label>Fecha nacimiento:</label><br></br><input type="date" name="fnacimiento" id="fnacimiento"></input><br></br><br></br></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><label>Primer nombre:</label><TXT_info name="txt_pnombre" id="txt_pnombre" value="pNombre"></TXT_info><br></br></td>
                        <td><label>Segundo nombre:</label><TXT_info name="txt_snombre" id="txt_snombre" value="sNombre"></TXT_info><br></br></td>
                        <td><label>Primer apellido:</label><TXT_info name="txt_papellido" id="txt_papellido" value="pApellido"></TXT_info><br></br></td>
                        <td> <label>Segundo apellido:</label><TXT_info name="txt_papellido" id="txt_papellido" value="sApellido"></TXT_info><br></br></td>
                   </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <div>
                            <label>Provincia:</label>
                            <select name="Provincia" id="Provincia" value="Provincia"
                            onChange={(e) => setState({ ...state, "Provincia": e.target.value })}>
                                <option value="SanJose">San José</option>
                                <option value="Alajuela">Alajuela</option>
                                <option value="Heredia">Heredia</option>
                                <option value="Puntarenas">Puntarenas</option>
                                <option value="Cartago">Cartago</option>
                                <option value="Limon">Limón</option>
                                <option value="Guanacaste">Guanacaste</option>
                            </select>
                            </div><br /><br></br>
                        </td>
                        <td>
                            <div>
                            <label>Cantón:</label>
                            <select name="Canton" id="Canton" value="Canton"
                            onChange={(e) => setState({ ...state, "Canton": e.target.value })}>
                                <option value="PZ">Pérez Zeledón</option>
                                <option value="Escazu">Escazú</option>
                                <option value="Heredia">Desamparados</option>
                            </select>
                            </div><br /><br></br></td>
                            <td>
                            <div>
                            <label>Distrito:</label>
                            <select name="Distrito" id="Distrito" value="Distrito"
                            onChange={(e) => setState({ ...state, "Distrito": e.target.value })} >
                                <option value="SanIsidro">San Isidro de El General</option>
                                <option value="ElGeneral">El General</option>
                                <option value="DanielFlores">Daniel Flores</option>
                            </select>
                            </div><br /><br></br>
                        </td>
                        <br></br>
                   </tr>
                </tbody>
                <tbody>
                        <td>
                            <label>Sexo:</label>
                            <input type="radio" id="Hombre" name="sexoest" 
                            onChange={(e) => setState({ ...state, "Sexo": "M" })}></input>
                            <label htmlFor="Hombre">Hombre</label>
                            <input type="radio" id="Mujer" name="sexoest" 
                            onChange={(e) => setState({ ...state, "Sexo":"F" })}></input>
                            <label htmlFor="Mujer">Mujer </label>
                            <br></br>
                            <br></br>
                            <p>{state.Mujer}</p>
                            <p>{state.Hombre}</p>
                        </td>
                        <td></td>
                        <td>
                            <div>
                            <label>Lugar nacimiento:</label>
                            <select name="lugarnacimiento" id="lugarnacimiento" value="lugarnacimiento"
                            onChange={(e) => setState({ ...state, "lugarnacimiento": e.target.value })}>
                                <option value="CostaRica">Costa Rica</option>
                                <option value="Panamá">Panamá</option>
                                <option value="USA">Estados Unidos</option>
                            </select>
                            </div><br /><br></br>
                        </td>
                    
                </tbody>
                
            </table>
        </div>
    )
}

export function InfoEncargado(){
    const [state, setState] = useContext(AppContext);
    return(
         <div>
            <table width="40%">
                <tbody>
                    <tr>
                        <td>
                            <label >Informacion Laboral:</label>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><label>Ocupación:</label></td>
                        <td><label>Lugar de Trabajo:</label></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td> <TXT_info name="txt_Ocupación" id="txt_Ocupación" value="Ocupacion"></TXT_info></td>
                        <td><TXT_info name="txt_LTrabajo" id="txt_LTrabajo" value="LTrabajo"></TXT_info></td> 
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><label>Contacto:</label></td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><label>Correo Electronico:</label></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><TXT_info name="txt_CElectronico" id="txt_CElectronico" value="CElectronico"></TXT_info></td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><label>Número de Teléfono:</label></td>
                        <td></td>
                        
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><TXT_info name="txt_NumTelefono" id="txt_NumTelefono" value="NumTelefono"></TXT_info></td>
                        <td></td>
                        
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><label>Parentesco:</label></td>
                        <td></td>
                        <td><label>Escolaridad:</label></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <div >
                            <select name="Parentesco" id="Parentesco"  value="Parentesco"
                            onChange={(e) => setState({ ...state, "Parentesco": e.target.value })} >
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
                            <select name="Escolaridad" id="Escolaridad"  value="Escolaridad"
                            onChange={(e) => setState({ ...state, "Escolaridad": e.target.value })}>
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
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td><label>Vive con la (el) estudiante:</label></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td> 
                        <input type="radio" id="SI" name="viveest"  value="Si"
                            onChange={(e) => setState({ ...state, "Si": e.target.value })}></input>
                        <label htmlFor="Si">Si</label>
                        <input type="radio" id="No" name="viveest" value="No"
                            onChange={(e) => setState({ ...state, "No": e.target.value })}></input>
                        <label htmlFor="No">No</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

