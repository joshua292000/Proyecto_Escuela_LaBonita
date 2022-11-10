import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { Matricula } from "../Persistencia/MatriculaService";
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import "../Estilos.css";
export function InfoEstudiante() {
  const [stateApp, setStateApp] = useContext(infoEncargado);
  const [state, setState] = useContext(infoEstudiante);
  return (
    <div className="Div">
      <h1>Información del estudiante</h1>
        <table className="Tabla" width="40%">
          <tr>
            <td>
              <div>
                <label>Grado:</label>
                <br></br>
                <select
                  value={state.Grado}
                  name="Grado"
                  id="Grado"
                  onChange={(e) =>
                    setState({ ...state, Grado: e.target.value })
                  }
                >
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
                <select
                  value={state.adecuacion}
                  name="Adecuación"
                  id="Adecuación"
                  onChange={(e) =>
                    setState({ ...state, adecuacion: e.target.value })
                  }
                >
                  <option value="No tiene">No tiene</option>
                  <option value="Nosignificativa">No significativa</option>
                  <option value="Significativa">Significativa</option>
                  <option value="De acceso">De acceso</option>
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
              <div className="Radio">
                <input
                  type="radio"
                  checked={state.viaja === "S"}
                  id="solo"
                  name="viaja"
                  onChange={(e) => setState({ ...state, viaja: "S" })}
                ></input>
                <label for="solo">Solo</label>
              </div>
              <div className="Radio">
                <br></br>
                <input
                  type="radio"
                  checked={state.viaja === "A"}
                  id="acompaniado"
                  name="viaja"
                  onChange={(e) => setState({ ...state, viaja: "A" })}
                ></input>

                <label for="acompaniado">Acompañado </label>
              </div>
              <br></br>
              <br></br>
            </td>
            <td>
              {" "}
              <label for="Acompaniantes">
                Nombre de las personas que lo pueden acompañar:
              </label>
              <input
                type="text"
                value={""}
                onChange={(e) =>
                  setState({
                    ...state,
                    pApellido: e.target.value,
                  })
                }
                required
              ></input>
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
              <div className="Radio">
                <input
                  type="radio"
                  checked={state.poliza === "N"}
                  id="no"
                  name="desestimada"
                  onChange={(e) => setState({ ...state, poliza: "N" })}
                ></input>
                <label for="no">No</label>
              </div>
              <div className="Radio">
                <br></br>
                <input
                  type="radio"
                  checked={state.poliza === "S"}
                  id="si"
                  name="desestimada"
                  onChange={(e) => setState({ ...state, poliza: "S" })}
                ></input>
                <label for="si">Sí </label>
              </div>

              <br></br>
              <br></br>
            </td>
          </tr>

          <td></td>
        </table>
      
      <button
        type="button"
        className="Matricula"
        onClick={() => Matricula({ valueEst: state }, { valueEnc: stateApp })}
      >
        Matricula
      </button>
      <br />
      {/*<ButtonSiguiente
        dir="informacionestudiante"
        nom="Matricula"
        css="button_Siguiente"
        onClick={()=>Matricula()}
       
      />*/}
    </div>
  );
}

