

import { useContext, useState, useEffect } from "react";
import { ObtenerEstudiante } from "../Persistencia/EstudianteService";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { PaisService, ProvinciaService, CantonService, DistritoService } from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { infoEstudiante } from "../AppContext/providerEstudiante";

export function InfoPersonal() {
   const [state, setState] = useContext(infoEstudiante);
 // const [state, setState] = useState({});
  const Distrito = new DistritoService();
  const Canton = new CantonService();
  const Provincia = new ProvinciaService();
  const Pais = new PaisService();
  const [countries, setCountries] = useState([]);
  const [pro, setProvincia] = useState([]);
  const [Can, setCanton] = useState([]);
  const [Dis, setDistrito] = useState([]);

  useEffect(() => {
      Pais.getPais().then(data => setCountries(data));
      Provincia.getProvincia().then(data => setProvincia(data));
  }, []);
  return (
    
      <div className="form-demo" style={{ height: 'auto' }}>
          <span className="titleBlack">Información Personal del estudiante</span>
          <br />
          <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
              <div className="row ">
                  <div className="col-sm offset-md-2">
                      <div className="field">
                          <label><b>Cédula:</b></label>{" "}
                          <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                              <InputText
                                  style={{ width: '30px' }}
                                  id="cedula"
                                  keyfilter="num"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.cedula}
                                  onChange={(e) =>
                                      setState({ ...state, cedula: e.target.value })}
                                  required />
                              <Button
                                  icon="pi pi-search"
                                  id="Buscar2"
                                  className="p-button-warning"
                                  onMouseMove={()=>{Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia)))
                                                   Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))}}
                                  onClick={async() => {
                                    
                                    setState(await ObtenerEstudiante(state.cedula));
                                  }} />
                          </div>
                          <div>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm  ">
                      <div className="field">
                          <label><b>Fecha nacimiento:</b></label>{" "}
                          <div >
                              <Calendar
                                  className="p-inputtext-sm block mb-2"
                                  inputId="calendar" id="fnacimiento"
                                  value={new Date(state.fechaNaci)} 
                                  dateFormat="yy-mm-dd"                             
                                  onChange={(e) =>
                                      setState({ ...state, fechaNaci: e.target.value.toLocaleDateString('zh-Hans-CN')})}
                                      showIcon
                                  />                         
                          </div>
                      </div>
                  </div>
              </div>
              <Divider align="left" ></Divider>
              <div className="row">
                  <div className=" col-sm">
                      <div className="field">
                          <label><b>Primer nombre:</b></label>{" "}
                          <div>
                              <InputText
                                  id="pNombre"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.pNombre}
                                  onChange={(e) =>
                                      setState({ ...state, pNombre: e.target.value, })}
                                  required 
                                  style={{ width: '90%' }} />
                          </div>
                      </div>
                  </div>
                  <div className="col-sm">
                      <div className="field">
                          <label><b>Segundo nombre:</b></label>
                          <div>
                              <InputText
                                  id="sNombre"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.sNombre}
                                  style={{ width: '90%' }}
                                  onChange={(e) =>
                                      setState({ ...state, sNombre: e.target.value, })}
                                  required />
                          </div>
                      </div>
                  </div>
                  <div className="col-sm ">
                      <div className="field">
                          <label><b>Primer apellido:</b></label>
                          <div>
                              <InputText
                                  id="pApellido"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.pApellido}
                                  style={{ width: '90%' }}
                                  onChange={(e) =>
                                      setState({ ...state, pApellido: e.target.value, })}
                                  required />
                          </div>
                      </div>
                  </div>
                  <div className="col-sm">
                      <div className="field">
                          <label><b>Segundo apellido:</b></label>
                          <div>
                              <InputText
                                  id="sApellido"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.sApellido}
                                  style={{ width: '90%' }}
                                  onChange={(e) =>
                                      setState({ ...state, sApellido: e.target.value, })}
                                  required />
                          </div>
                      </div>
                  </div>
              </div>
              <Divider align="left" ></Divider>
              <div className="row">
                  <div className="col-sm">
                      <div className="field">
                          <label><b>Provincia:</b></label>
                          <div>
                              <Dropdown
                                  inputId="dropdown"
                                  name="Provincia"
                                  id="Provincia"
                                  className="p-inputtext-sm block mb-2"
                                  value={state.provincia}
                                  optionValue="code"
                                  options={pro}
                                  placeholder="Provincia"
                                  onChange={(e) =>
                                      setState({ ...state, provincia: e.target.value, })}
                                  optionLabel="name"
                                  style={{ width: 'auto' }} />
                          </div>
                      </div>
                  </div>
                  <div className="col-sm">
                      <div className="field">
                          <label><b>Cantón:</b></label>
                          <div>
                              <Dropdown
                                  inputId="dropdown"
                                  value={state.canton}
                                  className="p-inputtext-sm block mb-2"
                                  name="Canton"
                                  id="Canton"
                                  placeholder="Cantón"
                                  optionValue="code"
                                  options={Can}
                                  onClickCapture={(e) =>
                                      Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia)))}
                                  onChange={(e) =>
                                      setState({ ...state, canton: e.target.value })
                                  }
                                  optionLabel="name" 
                                  style={{ width: 'auto' }}/>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm">
                      <div className="field">
                          <label><b>Distrito:</b></label>
                          <div>
                              <Dropdown
                                  inputId="dropdown"
                                  name="Distrito"
                                  id="Distrito"
                                  optionValue="code"
                                  value={state.distrito}
                                  className="p-inputtext-sm block mb-2"
                                  options={Dis}
                                  onClickCapture={(e) =>
                                      Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))}
                                  placeholder="Distrito"
                                  onChange={(e) =>
                                      setState({ ...state, distrito: e.target.value })
                                  }
                                  optionLabel="name" 
                                  style={{ width: 'auto' }}/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-4">
                      <label><b>Dirección exacta:</b></label>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm ">
                      <InputTextarea
                          className="p-inputtext-sm block mb-2"
                          value={state.direccion}
                          id="direccion"
                          onChange={(e) =>
                              setState({ ...state, direccion: e.target.value })}
                          rows={1}
                          autoResize
                          style={{ transform: 'translateX(5px)', width: '98%' }} />
                  </div>
              </div>
              <Divider align="left" ></Divider>
              <div className="row">
                  <div className="col-sm-2">
                      <label className="sexo"><b>Sexo:</b></label>
                  </div>
              </div>
              <div className="row ">
                  <div className="col-sm-auto col-sm-5">
                      <RadioButton
                          inputId="city1"
                          value="true"
                          checked={state.sexo === "M"}
                          id="Hombre"
                          name="sexoest"
                          onChange={(e) =>
                              setState({ ...state, sexo: "M" })} />
                      <label
                          htmlFor="city1"
                          style={{ transform: 'translate(10px,7px)' }}>
                          <b>Hombre</b> 
                      </label>
                  </div>
                  <div className="col-sm-auto">
                      <RadioButton
                          inputId="city2"
                          value="true"
                          checked={state.sexo === "F"}
                          id="Mujer"
                          name="sexoest"
                          onChange={(e) =>
                              setState({ ...state, sexo: "F" })} />
                      <label
                          htmlFor="city2"
                          style={{ transform: 'translate(10px,7px)' }}>
                          <b>Mujer</b> 
                      </label>
                  </div>
              </div>
              <Divider align="left" ></Divider>
              <div className="row">
                  <div className="col-auto">
                      <label><b>Lugar de nacimiento:</b></label>
                      <div>
                          <Dropdown
                              inputId="dropdown"
                              name="lugarnacimiento"
                              id="lugarnacimiento"
                              className="p-inputtext-sm block mb-2"
                              optionValue="name"
                              value={state.lugarnacimiento}
                              options={countries}
                              filter showClear filterBy="name"
                              placeholder="Lugar de nacimiento"
                              style={{ width: '100%' }}
                              onChange={(e) =>
                                  setState({ ...state, lugarnacimiento: e.target.value, })}
                              optionLabel="name" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}