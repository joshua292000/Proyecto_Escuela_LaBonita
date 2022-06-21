import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useContext } from "react";
import { inforEstudiante } from "../AppContext/providerEstudiante";
import Matricula from "../Persistencia/Matricula";


export function TXT_infoE(props) {
  //const [state, setState] = useContext(AppContext);
  return (
    <div>
      <input
        type="text"
        value={props.dfvalue}
        onChange={(e) => props.setState({ [props.value]: e.target.value })}
        required
      ></input>
      <br></br>
    </div>
  );
}


export function InfoEstudiante(props) {

  //const [state, setState] = useContext(inforEstudiante);

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
                 onChange={(e) => props.setState({ "Grado": e.target.value })}>
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
                   onChange={(e) => props.setState({ "Adecuación": e.target.value })}>
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
              <input type="radio" id="solo" name="viaja"  onChange={(e) => props.setState({  "viaje": "S" })}></input>
              <label for="solo">Solo</label>
              <br></br>
              <input
                type="radio"
                id="acompaniado"
                name="viaja"
                onChange={(e) => props.setState({  "viaje": "A" })}
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
              <TXT_info name="txt_acompanante" id="txt_acompanante" value="Acompanante" setState ={props.setState}></TXT_info>
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
              onChange={(e) => props.setState({  "poliza": "N" })}></input>
              <label for="no">No</label>
              <br></br>
              <input type="radio" id="si" name="desestimada"   
              onChange={(e) => props.setState({  "poliza": "S" })}></input>
              <label for="si">Sí </label>
              <br></br>
              <br></br>
            </td>
          </tr>

          <td></td>
        </table>
      </fieldset>

      <ButtonSiguiente
        dir="informacionestudiante"
        nom="Matricula"
        css="button_Siguiente"
        onClick={Matricula}
       
      />
    </div>
  );
}
