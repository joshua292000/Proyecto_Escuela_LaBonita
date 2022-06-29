import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { ObtenerEstudiante } from "../Persistencia/EstudianteService";
import { ObtenerEncargado } from "../Persistencia/EncargadoService";
export function ButtonSiguiente(props) {
  const [state, setState] = useContext(infoEncargado);
  const navegar = useNavigate();
  const acciones = () => {
    if("enc" in props && props.idEncar != null){
      ObtenerEncargado({state: state, setState: setState, cedula: 'null', idEncar: props.idEncar})
    }
    navegar("/" + props.dir);
  };

  return (
    <div>
      <button type="button" className={props.css} onClick={acciones}>
        {props.nom}
      </button>
      <br />
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
        onChange={(e) =>
          props.setState({ ...props.state, [props.value]: e.target.value })
        }
        required
      ></input>
      <br></br>
    </div>
  );
}
export function InfoPersonal(props) {
  console.log("Se abrio personal");
   const [state, setState] = useContext(infoEncargado);

  return (
    <div>
      <table className="Tabla" width="40%">
        <tbody>
          <tr>
            <td>
              <label>Cédula:</label>{" "}
              <TXT_info
                name="txt_cedula"
                id="txt_cedula"
                value="cedula"
                dfvalue={props.state.cedula}
                setState={props.setState}
                state={props.state}
              ></TXT_info>
              <br></br>
            </td>
            <br></br>
            <tr>
              <button
                id="Buscar"
                onClick={() => {
                    console.log("QUIEN "+props.quien)
                    if(props.quien === "estudiante" ){
                        ObtenerEstudiante({state: props.state, setState: props.setState});
                    }
                    else if(props.quien === "encargado"){
                       ObtenerEncargado({state: props.state, setState: props.setState, cedula: props.state.cedula, idEncar: 0})
                    }
                }}
              >
                Buscar
              </button>
              <br></br>
            </tr>

            <td>
              <label>Fecha nacimiento:</label>
              <br></br>{" "}
              <input
                value={props.state.fechNac}
                type="date"
                name="fnacimiento"
                id="fnacimiento"
                onChange={(e) =>
                  props.setState({ ...props.state, fechNac: e.target.value })
                }
              ></input>
              <br></br>
              <br></br>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <label>Primer nombre:</label>
              <TXT_info
                dfvalue={props.state.pNombre}
                name="txt_pnombre"
                id="txt_pnombre"
                value="pNombre"
                setState={props.setState}
                state={props.state}
              ></TXT_info>
              <br></br>
            </td>
            <td>
              <label>Segundo nombre:</label>
              <TXT_info
                dfvalue={props.state.sNombre}
                name="txt_snombre"
                id="txt_snombre"
                value="sNombre"
                setState={props.setState}
                state={props.state}
              ></TXT_info>
              <br></br>
            </td>
            <td>
              <label>Primer apellido:</label>
              <TXT_info
                dfvalue={props.state.pApellido}
                name="txt_papellido"
                id="txt_papellido"
                value="pApellido"
                setState={props.setState}
                state={props.state}
              ></TXT_info>
              <br></br>
            </td>
            <td>
              {" "}
              <label>Segundo apellido:</label>
              <TXT_info
                dfvalue={props.state.sApellido}
                name="txt_papellido"
                id="txt_papellido"
                value="sApellido"
                setState={props.setState}
                state={props.state}
              ></TXT_info>
              <br></br>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <div>
                <label>Provincia:</label>
                <select
                  value={props.state.provincia}
                  name="Provincia"
                  id="Provincia"
                  onChange={(e) =>
                    props.setState({
                      ...props.state,
                      provincia: e.target.value,
                    })
                  }
                >
                  <option value="San Jose">San José</option>
                  <option value="Alajuela">Alajuela</option>
                  <option value="Heredia">Heredia</option>
                  <option value="Puntarenas">Puntarenas</option>
                  <option value="Cartago">Cartago</option>
                  <option value="Limon">Limón</option>
                  <option value="Guanacaste">Guanacaste</option>
                </select>
              </div>
              <br />
              <br></br>
            </td>
            <td>
              <div>
                <label>Cantón:</label>
                <select
                  value={props.state.canton}
                  name="Canton"
                  id="Canton"
                  onChange={(e) =>
                    props.setState({ ...props.state, canton: e.target.value })
                  }
                >
                  <option value="Pérez Zeledón">Pérez Zeledón</option>
                  <option value="Escazu">Escazú</option>
                  <option value="Heredia">Desamparados</option>
                </select>
              </div>
              <br />
              <br></br>
            </td>
            <td>
              <div>
                <label>Distrito:</label>
                <select
                  value={props.state.distrito}
                  name="Distrito"
                  id="Distrito"
                  onChange={(e) =>
                    props.setState({ ...props.state, distrito: e.target.value })
                  }
                >
                  <option value="San Isidro de El General">
                    San Isidro de El General
                  </option>
                  <option value="El General">El General</option>
                  <option value="Daniel Flores">Daniel Flores</option>
                </select>
              </div>
              <br />
              <br></br>
            </td>
            <br></br>
          </tr>
        </tbody>
        <tbody>
          <td>
          <label className="sexo">Sexo:</label>
            <div className="Radio">
              <input
                type="radio"
                value="true"
                checked={props.state.sexo === "M"}
                id="Hombre"
                name="sexoest"
                onChange={(e) => props.setState({ ...props.state, sexo: "M" })}
              ></input>
              <label htmlFor="Hombre">Hombre</label>
            </div>
            <div className="Radio">
              <input
                type="radio"
                checked={props.state.sexo === "F"}
                id="Mujer"
                name="sexoest"
                onChange={(e) => props.setState({ ...props.state, sexo: "F" })}
              ></input>
              <label htmlFor="Mujer">Mujer </label>
            </div>
            <br></br>
            <br></br>
          </td>
          <td></td>
          <td>
            <div>
              <label>Lugar nacimiento:</label>
              <select
                value={props.state.lugarnacimiento}
                name="lugarnacimiento"
                id="lugarnacimiento"
                onChange={(e) =>
                  props.setState({
                    ...props.state,
                    lugarnacimiento: e.target.value,
                  })
                }
              >
                <option value="Costa Rica">Costa Rica</option>
                <option value="Panamá">Panamá</option>
                <option value="USA">Estados Unidos</option>
              </select>
            </div>
            <br />
            <br></br>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export function InfoEncargado() {
  const [state, setState] = useContext(infoEncargado);
  return (
    <div>
      <table className="Tabla" width="40%">
        <tbody>
          <tr>
            <td>
              <label>Información Laboral:</label>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <label>Ocupación:</label>
            </td>
            <td>
              <label>Lugar de Trabajo:</label>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              {" "}
              <TXT_info
               dfvalue={state.ocupacion}
                name="txt_Ocupación"
                id="txt_Ocupación"
                value="ocupacion"
                setState={setState}
                state={state}
              ></TXT_info>
            </td>
            <td>
              <TXT_info
              dfvalue={state.lTrabajo}
                name="txt_LTrabajo"
                id="txt_LTrabajo"
                value="lTrabajo"
                setState={setState}
                state={state}
              ></TXT_info>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <label>Contacto:</label>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <label>Correo Electrónico:</label>
              <br></br>
              <TXT_info
                dfvalue={state.cElectronico}
                name="txt_CElectronico"
                id="txt_CElectronico"
                value="cElectronico"
                setState={setState}
                state={state}
              ></TXT_info>
              <br></br>
              <label>Número de Teléfono:</label>
              <TXT_info
              dfvalue={state.numTelefono}
                name="txt_NumTelefono"
                id="txt_NumTelefono"
                value="numTelefono"
                setState={setState}
                state={state}
              ></TXT_info>
            </td>
            <td>
              &nbsp; &nbsp;
              <div>
                <label>Estado Civil:</label>
                <select
                  name="EstadoCivil"
                  id="EstadoCivil"
                  value={state.estadoCivil}
                  onChange={(e) =>
                    setState({ ...state, estadoCivil: e.target.value })
                  }
                >
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
            <td>
              <label>Parentesco:</label>
            </td>
            <td></td>
            <td>
              <label>Escolaridad:</label>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <div>
                <select
                  name="Parentesco"
                  id="Parentesco"
                  value={state.parentesco}
                  onChange={(e) =>
                    setState({ ...state, parentesco: e.target.value })
                  }
                >
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
              <div>
                <select
                  name="Escolaridad"
                  id="Escolaridad"
                  value={state.escolaridad}
                  onChange={(e) =>
                    setState({ ...state, escolaridad: e.target.value })
                  }
                >
                  <option value="Ninguna">Ninguna</option>
                  <option value="Primaria incompleta">
                    Primaria incompleta
                  </option>
                  <option value="Primaria completa">Primaria completa</option>
                  <option value="Secundaria incompleta">
                    Secundaria incompleta
                  </option>
                  <option value="Secundaria completa">
                    Secundaria completa
                  </option>
                  <option value="Técnico profesional">
                    Técnico profesional
                  </option>
                  <option value="Universitaria">Universitaria</option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <label>Vive con la (el) estudiante:</label>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>
              <div className="Radio">
                <input
                  type="radio"
                  id="SI"
                  name="viveest"
                  checked={state.viveEST === 'S'}
                  onChange={(e) => setState({ ...state, viveEST: "S" })}
                ></input>
                <label htmlFor="Si">Si</label>
              </div>
              <div className="Radio">
                <input
                  type="radio"
                  id="No"
                  name="viveest"
                  value="No"
                  checked={state.viveEST === 'N'}
                  onChange={(e) => setState({ ...state, viveEST: "N" })}
                ></input>
                <label htmlFor="No">No</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
