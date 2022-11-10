import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { ObtenerEstudiante } from "../Persistencia/EstudianteService";


export function InfoPersonal() {
    const [state, setState] = useContext(infoEstudiante);
  
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
              </td>
              <br/>
              <tr>
                <button
                  id="Buscar"
                  onClick={() => {
                    ObtenerEstudiante({state: state, setState: setState});
                  }}
                >
                  Buscar
                </button>
                <br/>
              </tr>
  
              <td>
                <label>Fecha nacimiento:</label>
                
                <input
                  value={state.fechNac}
                  type="date"
                  name="fnacimiento"
                  id="fnacimiento"
                  onChange={(e) =>
                    setState({ ...state, fechNac: e.target.value })
                  }
                ></input>
              </td>
           
            </tr>
          </tbody>
          
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
                
              </td>
            </tr>
          
          <tbody>
            <tr>
              <td>
                
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
                
                
              </td>
              <td>
                
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
                
               
              </td>
              <td>
                
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
               
                
              </td>
             
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
              
            </td>
            <td></td>
            <td>
             
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
           
             
            </td>
          </tbody>
        </table>
      </div>
    );
  }
  