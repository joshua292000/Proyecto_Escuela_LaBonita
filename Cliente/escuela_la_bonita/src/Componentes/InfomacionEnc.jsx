import { useContext } from "react";
import { ObtenerEncargado } from "../Persistencia/EncargadoService";
import { infoEncargado, infoContacto } from "../AppContext/providerInfoEncargado";

export function InfoPersonal() {
  const [state, setState] = useContext(infoEncargado);
  
  console.log("STATE");
  console.log(state);
  return (
    <div>
      <table className="Tabla" width="40%">
        <tbody>
          <tr>
            <td>
              <label>Cédula:</label>{" "}
              <input
                type="text"
                value={state.cedula}
                onChange={(e) => setState({ ...state, cedula: e.target.value })}
                required
              ></input>
              <br></br>
            </td>
            <br></br>
            <tr>
              <button
                id="Buscar"
                onClick={() => {

                  ObtenerEncargado({
                    state: state,
                    setState: setState,
                    cedula: state.cedula,
                    idEncar: 0,
                  });
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
                value={state.fechNac}
                type="date"
                name="fnacimiento"
                id="fnacimiento"
                onChange={(e) =>
                  setState({ ...state, fechNac: e.target.value })
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
              <input
                type="text"
                value={state.pNombre}
                onChange={(e) =>
                  setState({
                    ...state,
                    pNombre: e.target.value,
                  })
                }
                required
              ></input>
              <br></br>
            </td>
            <td>
              <label>Segundo nombre:</label>
              <input
                type="text"
                value={state.sNombre}
                onChange={(e) =>
                  setState({
                    ...state,
                    sNombre: e.target.value,
                  })
                }
                required
              ></input>
              <br></br>
            </td>
            <td>
              <label>Primer apellido:</label>
              <input
                type="text"
                value={state.pApellido}
                onChange={(e) =>
                  setState({
                    ...state,
                    pApellido: e.target.value,
                  })
                }
                required
              ></input>
              <br></br>
            </td>
            <td>
              {" "}
              <label>Segundo apellido:</label>
              <input
                type="text"
                value={state.sApellido}
                onChange={(e) =>
                  setState({
                    ...state,
                    sApellido: e.target.value,
                  })
                }
                required
              ></input>
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
                  value={state.provincia}
                  name="Provincia"
                  id="Provincia"
                  onChange={(e) =>
                    setState({
                      ...state,
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
                  value={state.canton}
                  name="Canton"
                  id="Canton"
                  onChange={(e) =>
                    setState({ ...state, canton: e.target.value })
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
                  value={state.distrito}
                  name="Distrito"
                  id="Distrito"
                  onChange={(e) =>
                    setState({ ...state, distrito: e.target.value })
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
                checked={state.sexo === "M"}
                id="Hombre"
                name="sexoest"
                onChange={(e) => setState({ ...state, sexo: "M" })}
              ></input>
              <label htmlFor="Hombre">Hombre</label>
            </div>
            <div className="Radio">
              <input
                type="radio"
                checked={state.sexo === "F"}
                id="Mujer"
                name="sexoest"
                onChange={(e) => setState({ ...state, sexo: "F" })}
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
                value={state.lugarnacimiento}
                name="lugarnacimiento"
                id="lugarnacimiento"
                onChange={(e) =>
                  setState({
                    ...state,
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
    const [stateCon, setStateCon] = useContext(infoContacto);

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
              <input
                type="text"
                value={state.ocupacion}
                onChange={(e) =>
                  setState({
                    ...state,
                    ocupacion: e.target.value,
                  })
                }
                required
              ></input>
            </td>
            <td>
              <input
                type="text"
                value={state.lTrabajo}
                onChange={(e) =>
                  setState({
                    ...state,
                    lTrabajo: e.target.value,
                  })
                }
                required
              ></input>
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
              <input
                type="text"
                value={stateCon.cElectronico}
                onChange={(e) =>
                  setStateCon({
                    ...stateCon,
                    cElectronico: e.target.value,
                  })
                }
                required
              ></input>
              <br></br>
              <label>Número de Teléfono:</label>
              <input
                type="text"
                value={stateCon.numTelefono}
                onChange={(e) =>
                  setStateCon({
                    ...stateCon,
                    numTelefono: e.target.value,
                  })
                }
                required
              ></input>
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
                    setState({
                      ...state,
                      estadoCivil: e.target.value,
                    })
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
                    setState({
                      ...state,
                      parentesco: e.target.value,
                    })
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
                    setState({
                      ...state,
                      escolaridad: e.target.value,
                    })
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
                  checked={state.viveEST === "S"}
                  onChange={(e) =>
                    setState({ ...state, viveEST: "S" })
                  }
                ></input>
                <label htmlFor="Si">Si</label>
              </div>
              <div className="Radio">
                <input
                  type="radio"
                  id="No"
                  name="viveest"
                  value="No"
                  checked={state.viveEST === "N"}
                  onChange={(e) =>
                    setState({ ...state, viveEST: "N" })
                  }
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
