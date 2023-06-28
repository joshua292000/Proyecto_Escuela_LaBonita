
import React, { useContext, useState, useEffect, useRef} from "react";
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
import { addLocale } from 'primereact/api';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Cargando, tiempoCargando } from "./Utils";
import 'react-datepicker/dist/react-datepicker.css';

export function InfoPersonal() {
   const [state, setState] = useContext(infoEstudiante);
  const Distrito = new DistritoService();
  const Canton = new CantonService();
  const Provincia = new ProvinciaService();
  const Pais = new PaisService();
  const [countries, setCountries] = useState([]);
  const [pro, setProvincia] = useState([]);
  const [Can, setCanton] = useState([]);
  const [Dis, setDistrito] = useState([]);
  const [requerido, setRequerido] = useState(false);
  const [verModalMsj, setVerModalMsj] = useState(false);
  const [verCargando, setVerCargando] = useState(false);
  const navegar = useNavigate();
  const [fecha, setFecha] = useState('');

  const msjEmergente = useRef(null);

  useEffect(() => {
      Pais.getPais().then(data => setCountries(data));
      Provincia.getProvincia().then(data => setProvincia(data));

      //Se precarga la privincia y canton si se fuera a insertar un estudiante nuevo
      setState({...state, provincia : "San José", canton: "Pérez Zeledón"});
  }, []);



 console.log("estu", state);
  useEffect(() => {
    if(state.provincia){
        Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia)))
        Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))

    }
   }, [state.provincia]);

   addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
    });

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
      ];

    const validarRequeridos =()=>{
        setRequerido(true);
        if(state.cedula && state.fechaNaci && state.pNombre && state.pApellido && state.sApellido && 
            state.provincia && state.canton && state.distrito && state.direccion && state.sexo && 
            state.lugarNacimiento){
            navegar("/informacionencargado");
        }else{
            msjEmergente.current.show({  severity: 'error', summary: 'Campos requeridos', detail: 'Es necesario completar todos los campos requeridos', life: 3000});
        }

    }

    const compoSiguente =  async (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const _sigInput = index + 1;
            if(index === 0){
                 await consultarEstudiante();
            }
            else if (_sigInput < inputRefs.length) {
                inputRefs[_sigInput].current.focus();
            }
        }
    }

    const cerrarModalMsjEnter =  async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setVerModalMsj (false);
            document.getElementById("cedula").focus();
        }
    }

    const consultarEstudiante = async () =>{
        setVerCargando(true);
        const res = await ObtenerEstudiante(state.cedula)
        if(res !== null){
            //El timeout es para mostar la modal de cargando por 1/2 segundo
            setTimeout(()=>{
                setVerCargando(false); 
                setState(res);
                setFecha(new Date(res.fechaNaci));
            }, tiempoCargando);
            //setState(res);
            
        }else{
            //El timeout es para mostar la modal de cargando por 1/2 segundo
            setTimeout(()=>{
                setVerCargando(false);
                setVerModalMsj(true);
            }, tiempoCargando);
            //setVerModalMsj(true);
        }
    }
    const cerrarModalMsj = () => {
        setVerModalMsj(false);
        document.getElementById("cedula").focus();
    }

    const btnsModalMsj = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" className="p-button-text" autoFocus onKeyDown={cerrarModalMsjEnter} onClick={cerrarModalMsj} />
        </React.Fragment>
    );
   

  return (
    
    <div className="form-demo" style={{ height: 'auto' }}>
    <Toast ref={msjEmergente} className="p-toast-custom" />

    <Dialog visible={verModalMsj} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsj} onHide={cerrarModalMsj}>
        <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>
                El estudiante no se encuantra registrado.
            </span>
        </div>
    </Dialog>

    <Dialog visible={verCargando} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cargando..." modal >
        <Cargando/>
    </Dialog>

        <div className="container" >
        
            <div className="row ">
                <div className="col-sm offset-md-2">
                    <div className="field">
                        <label><b>Cédula:</b></label>{" "}
                        <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                            <InputText
                            ref={inputRefs[0]}
                            onKeyDown={(event)=>compoSiguente(event,0)}
                                style={{ width: '30px' }}
                                id="cedula"
                                keyfilter = {/^[a-zA-Z0-9]*$/}
                                maxLength={45}
                                className={requerido && !state.cedula ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                value={state.cedula ? state.cedula :''}
                                onChange={(e) =>
                                    setState({ ...state, cedula: e.target.value })}
                                required
                                autoFocus/>
                            <Button
                                icon="pi pi-search"
                                id="Buscar2"
                                className="p-button-warning"
                                onClick={async() => {
                                await consultarEstudiante();
                                }} />
                        </div>
                    </div>
                    {requerido && !state.cedula && <small className="p-error">Cédula es requerido</small>}
                </div>
                <div className="col-sm  ">
                    <div className="field">
                        <label><b>Fecha nacimiento:</b></label>{" "}
                        <div >
                        <Calendar
                            className={requerido && !state.fechaNaci ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                            inputId="calendar" id="fnacimiento"
                            dateFormat="dd-mm-yy"  
                            value={fecha} 
                            locale="es"     
                            required                     
                            onChange={(e) =>{
                                setState({ ...state, fechaNaci: e.value.toLocaleDateString('en-ZA')})
                                setFecha(new Date(e.value));
                            }}
                            showIcon
                            />      
                        </div>
                        {requerido && !state.fechaNaci && <small className="p-error">Fecha de nacimiento es requerido</small>} 
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
                            ref={inputRefs[1]}
                            onKeyDown={(event)=>compoSiguente(event, 1)}
                                id="pNombre"
                                className={requerido && !state.pNombre ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                value={state.pNombre ? state.pNombre : ''}
                                maxLength={45}
                                onChange={(e) =>
                                    setState({ ...state, pNombre: e.target.value})}
                                required 
                                style={{ width: '90%' }} />
                            {requerido && !state.pNombre && <small className="p-error">Primer nombre es requerido</small>}
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="field">
                        <label><b>Segundo nombre:</b></label>
                        <div>
                            <InputText
                            ref={inputRefs[2]}
                            onKeyDown={(event)=>compoSiguente(event, 2)}
                                id="sNombre"
                                className="p-inputtext-sm mb-2"
                                value={state.sNombre}
                                style={{ width: '90%' }}
                                maxLength={45}
                                onChange={(e) =>
                                    setState({ ...state, sNombre: e.target.value})}
                                required />
                        </div>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="field">
                        <label><b>Primer apellido:</b></label>
                        <div>
                            <InputText
                            ref={inputRefs[3]}
                            onKeyDown={(event)=>compoSiguente(event, 3)}
                                id="pApellido"
                                className={requerido && !state.pApellido ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                value={state.pApellido}
                                style={{ width: '90%' }}
                                maxLength={45}
                                onChange={(e) =>
                                    setState({ ...state, pApellido: e.target.value})}
                                required />
                            {requerido && !state.pApellido && <small className="p-error">Primer apellido es requerido</small>}
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="field">
                        <label><b>Segundo apellido:</b></label>
                        <div>
                            <InputText
                            ref={inputRefs[4]}
                            onKeyDown={(event)=>compoSiguente(event,4)}
                                id="sApellido"
                                className={requerido && !state.sApellido ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                value={state.sApellido}
                                style={{ width: '90%' }}
                                maxLength={45}
                                onChange={(e) =>
                                    setState({ ...state, sApellido: e.target.value})}
                                required />
                            {requerido && !state.sApellido && <small className="p-error">Segundo apellido es requerido</small>}
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
                                id="dropDown"
                                className={requerido && !state.provincia ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                value={state.provincia}
                                optionValue="code"
                                options={pro}
                                placeholder="Provincia"
                                onChange={(e) =>
                                    setState({ ...state, provincia: e.target.value})}
                                optionLabel="name"
                                style={{ width: 'auto' }} />
                        </div>
                        {requerido && !state.provincia && <small className="p-error">Provincia es requerido</small>}
                    </div>
                </div>
                <div className="col-sm">
                    <div className="field">
                        <label><b>Cantón:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                value={state.canton}
                                className={requerido && !state.canton ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                name="Canton"
                                id="dropDown"
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
                        {requerido && !state.canton && <small className="p-error">Cantón es requerido</small>}
                    </div>
                </div>
                <div className="col-sm">
                    <div className="field">
                        <label><b>Distrito:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                name="Distrito"
                                id="dropDown"
                                optionValue="code"
                                value={state.distrito}
                                className={requerido && !state.distrito ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                options={Dis}
                                onClickCapture={(e) =>
                                    Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))}
                                placeholder="Distrito"
                                onChange={(e) =>
                                    setState({ ...state, distrito: e.target.value })
                                }
                                optionLabel="name" 
                                style={{ width: '100%', height: '45px' }}/>
                        </div>
                        {requerido && !state.distrito && <small className="p-error">Distrito es requerido</small>}
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
                    ref={inputRefs[5]}
                    onKeyDown={(event)=>compoSiguente(event, 5)}
                        className={requerido && !state.direccion ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                        value={state.direccion}
                        id="direccion"
                        maxLength={200}
                        onChange={(e) =>
                            setState({ ...state, direccion: e.target.value })}
                        rows={1}
                        autoResize
                        style={{ transform: 'translateX(5px)', width: '98%' }} />
                    {requerido && !state.direccion && <small className="p-error">Dirección es requerido</small>}
                </div>
            </div>
            <Divider align="left" ></Divider>
            <div className="row">
                <div className="col-sm-2">
                    <label className="sexo"><b>Sexo:</b></label>
                </div>
            </div>
            <div className="row ">
                <div className="col-sm-2">
                    <RadioButton
                    className={requerido && !state.sexo? 'p-invalid'  : ''}
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
                <div className="col-sm-2">
                    <RadioButton
                    className={requerido && !state.sexo ? 'p-invalid'  : ''}
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

                <div className="row">
                <div className="col-sm-4">
                    <br />
                    {requerido && !state.sexo && <small className="p-error">Sexo es requerido</small>} 
                </div>
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
                            id="dropDown"
                            className={requerido && !state.lugarNacimiento ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                            optionValue="name"
                            value={state.lugarNacimiento}
                            options={countries}
                            filter showClear filterBy="name"
                            placeholder="Lugar de nacimiento"
                            style={{ width: '100%' }}
                            onChange={(e) =>
                                setState({ ...state, lugarNacimiento: e.target.value})}
                            optionLabel="name" />
                        {requerido && !state.lugarNacimiento && <small className="p-error">Este campo es requerido</small>}
                    </div>
                </div>
            </div>
            <Divider align="left" ></Divider>
        </div>
        <div className='container'>
        <div className="row justify-content-end">
            <div className="col-4">
            <Button  icon="pi pi-arrow-right" className="p-button-sm p-button-rounded p-button-info" 
            onClick={()=>{
            validarRequeridos();
            //navegar("/informacionencargado");
            }}/>
            </div>
        </div>
        </div>
    </div>
  );
}