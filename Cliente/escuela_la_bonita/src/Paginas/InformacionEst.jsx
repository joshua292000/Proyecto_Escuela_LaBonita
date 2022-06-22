import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import {Matricula} from "../Persistencia/Matricula";
import { AppContext } from "../AppContext/provider";


export function InfoEstudiante() {
     const [stateApp, setStateApp] = useContext(AppContext);
     const [state, setState] = useContext(infoEstudiante);
  return (
    <div>
      <h1>Información del estudiante</h1>
      <fieldset>
        <table width="40%">
          <tr>
            <td>
              <div>
                <label>Grado:</label>
                <br></br>
                <select name="Grado" id="Grado"
                 onChange={(e) => setState({ ...state,"grado": e.target.value })}>
                  <option value="Primero">Primero</option>
                  <option value="Segundo">Segundo</option>
                  <option value="Tercero">Tercero</option>
                  <option value="Cuarto">Cuarto</option>
                  <option value="Quinto">Quinto</option>
                  <option value="Sexto">Sexto</option>
                </select>

              </div>
              <br></br>
              
            </td>
            
            <tr>
              <div>
                <label>Adecuación:</label>
                <br></br>
                <select name="Adecuación" id="Adecuación"
                   onChange={(e) => setState({...state, "adecuacion": e.target.value })}>
                  <option value="Notiene">No tiene</option>
                  <option value="Nosignificativa">No significativa</option>
                  <option value="Significativa">Significativa</option>
                  <option value="Deacceso">De acceso</option>
                </select>
              </div>
              <br></br>
            </tr>

            <td></td>
          </tr>
          <tr>
            <td>
              <label>Viaja:</label>
              <br></br>
              <input type="radio" id="solo" name="viaja"  onChange={(e) => setState({...state,  "viaja": "S" })}></input>
              <label for="solo">Solo</label>
              <br></br>
              <input
                type="radio"
                id="acompaniado"
                name="viaja"
                onChange={(e) => setState({...state,  "viaja": "A" })}
              ></input>
              <label for="acompaniado">Acompañado </label>
              <br></br>
              <br></br>
            </td>
            <td>
              {" "}
              <label for="Acompaniantes">
                Nombre de las personas que lo pueden acompañar:
              </label>
              <TXT_info name="txt_acompanante" id="txt_acompanante" value="acompanante" setState ={setState} state={state}></TXT_info>
              <br></br>
              <br></br>
            </td>

            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>
              <label>Posee póliza estudiantil:</label>
              <br></br>
              <input type="radio" id="no" name="desestimada"     
              onChange={(e) => setState({ ...state, "poliza": "N" })}></input>
              <label for="no">No</label>
              <br></br>
              <input type="radio" id="si" name="desestimada"   
              onChange={(e) => setState({ ...state, "poliza": "S" })}></input>
              <label for="si">Sí </label>
              <br></br>
              <br></br>
            </td>
          </tr>
        
          <td></td>
        </table>
      </fieldset>
     
      <p>prueba2: {state.grado}<br/></p>
      <p> prueba3: {state.adecuacion}<br/></p>
      <p> prueba4: {state.viaja}<br/></p>
      <p>  prueba5: {state.acompanante}<br/></p>
      <p>  prueba6: {state.poliza}<br/></p>
      <p> prueba6: {state.lugarnacimiento}<br/></p>
  
      <button type="button" onClick={()=>Matricula({valueEst: state}, {valuePer: stateApp})}>Matricula</button><br />
      {/*<ButtonSiguiente
        dir="informacionestudiante"
        nom="Matricula"
        css="button_Siguiente"
        onClick={()=>Matricula()}
       
      />*/}
    </div>
  );
  
}
/*
<p>prueba:{state1.Grado}<br></br>
prueba2: {state.Grado}<br></br>
prueba3: {state.Adecuacion}<br></br>
prueba4: {state.viaje}<br></br>
prueba5: {state.Acompanante}<br></br>
prueba6: {state.poliza}<br></br>
prueba6: {state.lugarnacimiento}<br></br></p>
*/