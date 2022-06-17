import { ButtonSiguiente, TXT_info } from "../Componentes/Utils";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

export default function Inicio() {
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
                <select name="Grado" id="Grado">
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
                <select name="Adecuación" id="Adecuación">
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
              <input type="radio" id="solo" name="viaja" value="solo"></input>
              <label for="solo">Solo</label>
              <br></br>
              <input
                type="radio"
                id="acompaniado"
                name="viaja"
                value="acompaniado"
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
              <TXT_info
                name="txt_acompaniantes"
                id="txt_acompaniantes"
              ></TXT_info>
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
              <input type="radio" id="no" name="desestimada" value="No"></input>
              <label for="no">No</label>
              <br></br>
              <input type="radio" id="si" name="desestimada" value="Si"></input>
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
      />
    </div>
  );
}
