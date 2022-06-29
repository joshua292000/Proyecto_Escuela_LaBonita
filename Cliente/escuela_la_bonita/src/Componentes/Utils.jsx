import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
import { useContext } from "react";
import { infoEncargado } from "../AppContext/providerInfoEncargado";
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

export function TXT_info(props) {
    //const [state, setState] = useContext(AppContext);
    return (
      <div>
        <input
          type="text"
          value={props.dfvalue}
          onChange={(e) => props.setState({ ...props.state,[props.value]: e.target.value })}
          required
        ></input>
        <br></br>
      </div>
    );
  }
export function InfoPersonal(props){

    return(
         <div>
            <table className="Tabla" width="40%">
            <tbody>
                    <tr>
                        <td><label>Cédula:</label> <TXT_info name="txt_cedula" id="txt_cedula" value="cedula" setState ={props.setState} state={props.state}></TXT_info><br></br></td><br></br>
                        <tr><Button label="Buscar"  /><br></br></tr>
                        <td><label>Fecha nacimiento:</label><br></br> <input type="date" name="fnacimiento" id="fnacimiento" onChange={(e) => props.setState({ ...props.state ,"fechNac": e.target.value })}></input><br></br><br></br></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><label>Primer nombre:</label><TXT_info name="txt_pnombre" id="txt_pnombre" value="pNombre" setState ={props.setState} state={props.state}></TXT_info><br></br></td>
                        <td><label>Segundo nombre:</label><TXT_info name="txt_snombre" id="txt_snombre" value="sNombre" setState ={props.setState} state={props.state}></TXT_info><br></br></td>
                        <td><label>Primer apellido:</label><TXT_info name="txt_papellido" id="txt_papellido" value="pApellido" setState ={props.setState} state={props.state}></TXT_info><br></br></td>
                        <td> <label>Segundo apellido:</label><TXT_info name="txt_papellido" id="txt_papellido" value="sApellido" setState ={props.setState} state={props.state}></TXT_info><br></br></td>
                   </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <div>
                            <label>Provincia:</label>
                            <select name="Provincia" id="Provincia" 
                            onChange={(e) => props.setState({ ...props.state,"Provincia": e.target.value })}>
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
                            <select name="Canton" id="Canton"
                            onChange={(e) => props.setState({...props.state, "Canton": e.target.value })}>
                                <option value="PZ">Pérez Zeledón</option>
                                <option value="Escazu">Escazú</option>
                                <option value="Heredia">Desamparados</option>
                            </select>
                            </div><br /><br></br></td>
                            <td>
                            <div>
                            <label>Distrito:</label>
                            <select name="Distrito" id="Distrito" 
                            onChange={(e) => props.setState({...props.state,  "Distrito": e.target.value })} >
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
                            onChange={(e) => props.setState({ ...props.state, "sexo": "M" })}></input>
                            <label htmlFor="Hombre">Hombre</label>
                            <input type="radio" id="Mujer" name="sexoest" 
                            onChange={(e) =>  props.setState({...props.state, "sexo":"F" })}></input>
                            <label htmlFor="Mujer">Mujer </label>
                            <br></br>
                            <br></br>
                            
                        </td>
                        <td></td>
                        <td>
                            <div>
                            <label>Lugar nacimiento:</label>
                            <select name="lugarnacimiento" id="lugarnacimiento" 
                            onChange={(e) =>  props.setState({ ...props.state, "lugarnacimiento": e.target.value })}>
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
    const [state, setState] = useContext(infoEncargado);
    return(
        <div>
        <table  className="Tabla" width="40%">
            <tbody>
                <tr>
                    <td>
                        <label >Información Laboral:</label>
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
                    <td> <TXT_info name="txt_Ocupación" id="txt_Ocupación" value="ocupacion" setState ={setState} state ={state}></TXT_info></td>
                    <td><TXT_info name="txt_LTrabajo" id="txt_LTrabajo" value="lTrabajo"  setState ={setState} state ={state}></TXT_info></td> 
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td><label>Contacto:</label></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <label>Correo Electrónico:</label><br></br>
                        <TXT_info name="txt_CElectronico" id="txt_CElectronico" value="cElectronico"  setState ={setState} state ={state}></TXT_info><br></br>
                        <label>Número de Teléfono:</label>
                        <TXT_info name="txt_NumTelefono" id="txt_NumTelefono" value="numTelefono"  setState ={setState}  state ={state}></TXT_info>
                    </td>
                    <td>
                    &nbsp;
                    &nbsp;
                        <div >
                            <label  >Estado Civil:</label>
                            <select name="EstadoCivil" id="EstadoCivil"
                              onChange={(e) => setState({ ...state, "estadoCivil": e.target.value })}>
                                <option value="S">Soltero(a)</option>
                                <option value="C">Casado(a)</option>
                                <option value="U">Unión libre</option>
                                <option value="D">Divorciado(a)</option>
                                <option value="V">Viudo(a)</option>
                                <option value="E">Separado(a)</option>
                            </select>
                        </div>
                    </td>
                    
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
                        <select name="Parentesco" id="Parentesco"  
                        onChange={(e) => setState({ ...state, "parentesco": e.target.value })} >
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
                        <select name="Escolaridad" id="Escolaridad" 
                        onChange={(e) => setState({ ...state, "escolaridad": e.target.value })}>
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
                    <input type="radio" id="SI" name="viveest"
                        onChange={(e) => setState({ ...state, "viveEST": "S" })}></input>
                    <label htmlFor="Si">Si</label>
                    <input type="radio" id="No" name="viveest" value="No"
                        onChange={(e) => setState({ ...state, "viveEST": "N" })}></input>
                    <label htmlFor="No">No</label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

