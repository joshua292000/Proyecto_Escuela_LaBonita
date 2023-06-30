import React, { useContext, useState, useEffect, useRef } from "react";
import { Divider } from "primereact/divider";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { ButtonSiguiente, Cargando, tiempoCargando } from "./Utils";
import { addLocale } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { useNavigate} from "react-router-dom";

import { infoEstudiante } from "../AppContext/providerEstudiante";
import { infoEncargado } from '../AppContext/providerInfoEncargado';
import { Matricula } from "../Persistencia/MatriculaService";
import { ObtenerViajaCon, ObtenerPersonasViajaCon} from "../Persistencia/EstudianteService";
import { crearObjetoDocumentoMatri } from "../Utils/CrearObjetoDocumentoMatri";
import { generarDocumento } from "../Utils/GenerarDocumento";
import { msjRequeridos } from "./Utils";


export function InfoEstudianteMatricula() {

    const grados = [
        { name: "Primero" },
        { name: "Segundo" },
        { name: "Tercero" },
        { name: "Cuarto" },
        { name: "Quinto" },
        { name: "Sexto" },
    ];
    const adecuaciones = [
        { name: "No tiene" },
        { name: "No significativa" },
        { name: "Significativa" },
        { name: "De acceso" },
    ];

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

    let datosVacios = {
        cedula: "", pApellido: "",
        pNombre: "", sApellido: "",
        sNombre: ""
    };

    const navegar = useNavigate();
    
    const [state, setState] = useContext(infoEstudiante);
    const [encargado, setEncargado] =  useContext(infoEncargado);

    const [acompanianteEdit, setAcompanianteEdit] = useState(datosVacios);//contendrá la información del viaja con, que se edite o se cree
    const [verModal, setVerModal] = useState(false);//control booleano de la pantalla modal. true se muestra, false se oculta
    const [borrarAcom, setBorrarAcom] = useState(false);//controla el estado de visibilidad de la modal de confirmación para eliminar el acompañante
    const [verModalMsj, setVerModalMsj] = useState(false);//controla el estado de visibilidad de la modal de confirmación de que no está registrado
    const [verCanlendario, setVerCanlendario] = useState(false);//controla el renderizado condicional del calendario de la fecha de vencimiento de la póliza
    const [requerido, setRequerido] = useState(false);
    const [verModalMatri, setVerModalMatri] = useState(false);
    const [req, setReq] = useState(false);
    const [msjModal, setMsjModal]= useState("");
    const [matriCorrecta, setMatriCorrecta] = useState(false);
    const [verCargando, setVerCargando] = useState(false);
    const [gradoEstAnte, setGradoEstAnte] = useState("");//almacena el grado anterior del estudiante a matricular(grado de la matrícula pasada)
    const [gradoEst, setGradoEst] = useState("");//almacena el grado actual a matricular del estudiante
    const [fecha, setFecha] = useState();

    const msjEmergente = useRef(null);
    const dt = useRef(null);


    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
      ];

    useEffect(()=>{
        if("id" in state){
            obtenerAcompaniantes();
        }else if(!("acompaniante" in state)){
            crearAcompaniante();
        }

        if(state.poliza === "S"){
            setVerCanlendario(true);
        }
        setGradoEstAnte(state.grado);
        setFecha('vencePoliza' in state? new Date(state.vencePoliza):'');

    },[])
    console.log("estu", state, gradoEst);
    console.log("Enca", encargado);

    const crearNuevo = () => {
        setAcompanianteEdit(datosVacios);
        setVerModal(true);
        setRequerido(false);
    }

    const cerrarModal = () => {
        setVerModal(false);
        setRequerido(false);
    }

    const cerrarModalBorrar = () => {
        setBorrarAcom(false);
    }
    const cerrarModalMsj = () => {
        setVerModalMsj(false);
        setVerModal(true);
    }
    const cerrarModalMsjMatricula = () => {
        setVerModalMatri(false);
        if(matriCorrecta){
            limpiarDatos();
        }
    }

    const validarGradoSeleccionado = (gradoSelec) =>{
        if(state.grado){
            let indxGradoAnte = grados.findIndex((elemento) => elemento.name === gradoEstAnte);
            let indxGradoActual = grados.findIndex((elemento) => elemento.name === gradoSelec);
            if(indxGradoActual >= indxGradoAnte){
                setState({ ...state, grado: gradoSelec }); 
                setGradoEst(gradoSelec);
                
            }else{
                msjEmergente.current.show({ severity: 'error', summary: 'Grado no permitido', detail: 'El grado a asignar no puede ser inferior al que ya tenía asignado', life: 5000 });
            }

        }else{
            setState({ ...state, grado: gradoSelec});
            setGradoEst(gradoSelec);
        }
        
    }

    //consulta por los acompañantes de un estudiante ya registrado y se carga la informacion si la hay
    const obtenerAcompaniantes = async () =>{
        let acom =  await ObtenerPersonasViajaCon(state.id);
        let est =  {...state};
        let datos = [];
        let subAcom;
        // tiene acompañantes ya registados. Si el tamaño es > 1 tiene uno o más acompañantes
        if(acom.length > 1){
            //por el tipo de consulta puede que retorne un array de tamaño 3, no va se superior a eso,
            //si es de tamaño es 3 quiere decir que trae registros de dos tablas distintas.
            if(acom.length === 3){
                for (let i=0; i < acom.length-1; i++) {
                     subAcom = acom[i];
                     for (let j=0; j < subAcom.length; j++) {
                        datos.push(subAcom[j]);
                    }
                }
            }else{
                subAcom = acom[0];
                for (let j=0; j < subAcom.length; j++) {
                   datos.push(subAcom[j]);
               }
            }
            est.acompaniante = datos;
            setState(est);

        }else{
            setState({...state, acompaniante : []});
        } 
    }

    const crearAcompaniante= ()=>{
        let datos = {...state}
        datos.acompaniante = [];
        setState(datos);
    }

    const datosDeEntrada = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...acompanianteEdit };
        _product[`${name}`] = val;

        setAcompanianteEdit(_product);
    }

    const buscarXId = (cd) => {
        let index = -1;
        for (let i = 0; i < state.acompaniante.length; i++) {
            if (state.acompaniante[i].cedula === cd) {
                index = i;
                break;
            }
        }

        return index;
    }

    const buscarViajaCon = async ()=> {
        setVerCargando(true);
        const res = await ObtenerViajaCon(acompanianteEdit.cedula);
        if(res.pNombre === null){
            setTimeout(()=>{
                setVerModal(false);
                setVerModalMsj(true);
                setVerCargando(false);

            },500)
            
        }else{
            setTimeout(()=>{
                setAcompanianteEdit({ ...res });
                setVerCargando(false);
            }, 500);
        }           
        
    }
    const guardarAcompaniante = () => {
        setRequerido(true);
        if (acompanianteEdit.cedula && acompanianteEdit.pNombre && acompanianteEdit.pApellido && acompanianteEdit.sApellido) {
            let datos = [...state.acompaniante];
            let editados = { ...acompanianteEdit };
            if (acompanianteEdit.cedula) {
                const index = buscarXId(acompanianteEdit.cedula);
                if (index >= 0) {
                    datos[index] = editados;
                    msjEmergente.current.show({ severity: 'success', summary: 'Actualización', detail: 'Acompañante actualizado', life: 2500 });
                } else {
                    editados.estado = 'A';
                    editados.cedulaEst = state.cedula;
                    datos.push(editados);
                    msjEmergente.current.show({ severity: 'success', summary: 'Registrado', detail: 'Acompañante Registrado', life: 2500 });
                }

            } else {
                msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'error', summary: 'Se produjo un problema', detail: 'Acompañante NO Registrado', life: 2500 });
            }
            setState({...state, acompaniante : datos});
            setVerModal(false);
            setAcompanianteEdit(datosVacios);
        }else{
            msjEmergente.current.show({ severity: 'error', style:{backgroundColor: 'white'},  summary: 'Campos requeridos', detail: 'Hay campos requeridos sin llenar', life: 2500 });
        }
    }

    const borrarAcompaniante = async () => {
        if (acompanianteEdit.cedula.trim()) {
            let datos = [...state.acompaniante];
            if (acompanianteEdit.cedula) {
                const index = buscarXId(acompanianteEdit.cedula);
                datos[index].estado = 'I';
                msjEmergente.current.show({ severity: 'success', summary: 'Confirmación', detail: 'Encargado borrado correctamente', life: 3000 });
            } else {
                msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'error', summary: 'Se produjo un problema', detail: 'Encargado NO eliminado', life: 3000 });
            }
            setState({...state, acompaniante : datos});
            setAcompanianteEdit(datosVacios);
            setBorrarAcom(false);
        }
            
    }

    const editarAcompaniante = (data) => {
        setAcompanianteEdit({ ...data });
        setVerModal(true);
    }

    const confirmarBorrarEncargado = (data) => {
        setBorrarAcom (true);
        setAcompanianteEdit(data);
 
    }

    const validarRequeridos = async ()=>{
        setReq(true);
        let respuesta = null;
        if(gradoEst && state.adecuacion && state.poliza && state.imas && state.viaja){
            if(state.poliza !=="S" || state.vencePoliza){
                setVerCargando(true);
                respuesta = await Matricula(state, encargado);
                if(respuesta === null){
                    //El timeout es para mostar la modal de cargando por 1/2 segundo
                    setTimeout(()=>{
                        setMsjModal({ confirmar:"Estudiante matrículado correctamente!",
                                        imprimir: "Desea descargar el comprobante de matrícula?"});
                        setVerModalMatri(true);
                        setMatriCorrecta(true);
                        setVerCargando(false);
                    },tiempoCargando);
                    

                }else{
                    //El timeout es para mostar la modal de cargando por 1/2 segundo
                    setTimeout(()=>{
                        setMsjModal("Se produjo un problema al realizar la matrícula");
                        setVerModalMatri(true);
                        setMatriCorrecta(false);
                        setVerCargando(false);
                    },tiempoCargando);
                }
            }else{
                msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'error', summary: 'Campos requeridos', detail: 'Es necesario completar todos los campos requeridos', life: 3000 });
            }
        }else{
            msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'error', summary: 'Campos requeridos', detail: 'Es necesario completar todos los campos requeridos', life: 3000 });
        }

    }

    const compoSiguente = async (event, index)=> {
        if (event.key === 'Enter') {
          event.preventDefault();
          const _sigInput = index + 1;
          if(index === 0 ){
            await buscarViajaCon();
          }
          if (_sigInput < inputRefs.length) {
            inputRefs[_sigInput].current.focus();
          }
        }
    }

    const cerrarModalMatricula = () =>{
        setVerModalMatri(false);
    }

    const limpiarDatos = () =>{
        navegar("/Informacionpersonal");
        setState({});
        setEncargado([]);
        

    }

    const cerrarModalMsjEnter =  async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setVerModalMsj (false);
            setVerModal(true);
        }
    }

    const cerrarModalMatriculaEnter =  async (event) => {
        if (event.key === 'Enter') {
            cerrarModalMatricula();
        }
    }

   //funcion que genera y descarga el comprobante de matricula
    const generarComprobante = async () =>{
        setVerCargando(true);
        //El timeout es para mostar la modal de cargando por 1/2 segundo
        let datosComprobante = await crearObjetoDocumentoMatri(state, encargado);
        let nombre = "Matrícula_"+state.pNombre+state.pApellido+"_"+state.cedula;
        let res = await generarDocumento("PLANTILLAMATRICULA.docx", datosComprobante, nombre);
        cerrarModalMatricula();
        setTimeout(async()=>{
            setVerCargando(res);
            limpiarDatos();
        },tiempoCargando);

    }

    const btnAgregarViajaIzquierdo = () => {
        return (
            <React.Fragment>
                <Button label="Agregar acompaniante" icon="pi pi-plus" className="p-button-success mr-2" onClick={crearNuevo} />
            </React.Fragment>
        )
    }
    const btnsColmDercTabla = (rowData) => {
        return (
            <React.Fragment>
                {/*boton de editar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => { editarAcompaniante(rowData)}}
                />
                {/*boton de eliminar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={()=> {confirmarBorrarEncargado(rowData)}}/>
            </React.Fragment>
        );
    }

    const btnsModal = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={cerrarModal} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={guardarAcompaniante} />
        </React.Fragment>
    );

    const btnsModalBorrar = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={cerrarModalBorrar} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={borrarAcompaniante} />
        </React.Fragment>
    );

    const btnsModalMsj = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" className="p-button-text" autoFocus onKeyDown={cerrarModalMsjEnter} onClick={cerrarModalMsj} />
        </React.Fragment>
    );

    const btnsModalMsjMatricula = (
        <React.Fragment>
            
            <Button visible ={matriCorrecta} label="NO"  className="p-button-text"  onClick={cerrarModalMsjMatricula} />
            <Button visible ={matriCorrecta} label="SI"  className="p-button-text"  onClick={generarComprobante}/>
            <Button visible ={!matriCorrecta} label="Cerrar" icon="pi pi-times" className="p-button-text" autoFocus onKeyDown={cerrarModalMatriculaEnter} onClick={cerrarModalMatricula} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={msjEmergente} />
            {" "}
            <div >
                
                <div
                    className="container"
                    style={{
                        backgroundColor: 'white',
                        paddingTop: '15px',
                        borderRadius: "15px",
                        border: "15px solid rgb(163, 29, 29, 0.06)",
                    }}
                >
                    <div className="row ">
                        <div className="col-sm">
                            <div className="field">
                                <label>
                                  {state.grado? <b>Grado anterior: {gradoEstAnte}</b>: <b>Grado:</b>} 
                                </label>
                                <br></br>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Grado"
                                    id="Grado"
                                    className= {req && !gradoEst ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                    value={gradoEst}
                                    options={grados}
                                    placeholder="Seleccione un grado..."
                                    onChange={(e) => validarGradoSeleccionado(e.target.value)}
                                    optionLabel="name"
                                    optionValue="name"
                                    style={{ width: "auto" }}
                                />
                            </div>
                            {req && !gradoEst && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                        <div className="col-sm">
                            <div className="field">
                                <label>
                                    <b>Adecuación</b>
                                </label>
                                <br></br>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Adecuación"
                                    id="dropDown"
                                    className={req && !state.adecuacion ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                    value={state.adecuacion}
                                    options={adecuaciones}
                                    placeholder="Adecuación"
                                    onChange={(e) =>
                                        setState({ ...state, adecuacion: e.target.value })
                                    }
                                    optionLabel="name"
                                    optionValue="name"
                                    style={{ width: "auto" }}
                                />
                            </div>
                            {req && !state.adecuacion && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                        <div className="col-sm-4">
                            <div className="field">
                                <label htmlFor="descripcionAdecuacion">
                                    <b>Descripción de adecuación:</b>
                                </label>
                                <br></br>
                                <InputTextarea
                                    type="text"
                                    className="p-inputtext-sm mb-2"
                                    value={state.descripcion === null ? '' : state.descripcion}
                                    autoResize
                                    maxLength={150}
                                    onChange={(e) =>
                                        setState({...state,descripcion: e.target.value})}
                                    rows={5}
                                    style={{width: '80%' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Divider align="left"></Divider>
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="sexo">
                                <b>Posee póliza estudiantil:</b>
                            </label>
                        </div>
                        {verCanlendario &&
                        <div className="col-sm-8">
                            <label className="sexo">
                                <b>Fecha de vencimiento:</b>
                            </label>
                        </div>
                        }
                    </div>
                    <div className="row ">
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.poliza ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="poliza1"
                                value="true"
                                checked={state.poliza === "N"}
                                id="no"
                                name="desestimada"
                                onChange={(e) => {
                                    setState({ ...state, poliza: 'N' });
                                    setVerCanlendario(false);}}
                            />
                            <label
                                htmlFor="poliza1"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>No</b>
                            </label>
                        </div>
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.poliza ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="poliza2"
                                value="true"
                                checked={state.poliza === "S"}
                                id="si"
                                name="desestimada"
                                onChange={(e) =>{
                                    setState({ ...state, poliza: 'S' });
                                    setVerCanlendario(true);}}
                            />
                            <label
                                htmlFor="poliza2"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>Sí</b>
                            </label>
                        </div>
                        <div className=" col-sm-8">
                           {verCanlendario &&
                            <div className="field">
                                <div>
                                <Calendar
                                  className={req && !state.vencePoliza && state.poliza === 'S' ? 'p-invalid'  : "p-inputtext-sm mb-2"}  
                                    id="icon"
                                    value={fecha}
                                    locale="es"
                                    onChange={(e) =>{
                                                setState({ ...state, vencePoliza: e.value.toLocaleDateString('en-ZA') })
                                                setFecha(new Date(e.value));
                                              }}
                                    showIcon
                                    dateFormat="yy-mm-dd"
                                />
                                </div>
                                {req && !state.vencePoliza && state.poliza ==='S' && <small className="p-error">{msjRequeridos}</small>}
                            </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            {req && !state.poliza && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                    </div>
                    <Divider align="left"></Divider>
                    <div className ="row">
                        <div className="col-sm-4">
                            <label className="imas">
                                <b>Posee beca de IMAS:</b>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.imas ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="imas1"
                                value="true"
                                checked={state.imas === "N"}
                                id="s"
                                name="imas"
                                onChange={(e) => setState({ ...state, imas: 'N' })}
                            />
                            <label htmlFor="imas1" style={{ transform: "translate(10px,7px)" }}>
                                <b>No</b>
                            </label>
                        </div>
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.imas ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="imas2"
                                value="true"
                                checked={state.imas === "S"}
                                id="n"
                                name="imas"
                                onChange={(e) =>setState({ ...state, imas: 'S' })}
                            />
                            <label
                                htmlFor="imas2"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>Si</b>
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <br />
                                {req && !state.imas && <small className="p-error">{msjRequeridos}</small>}
                            </div>
                        </div>
                    </div>
                    
                    <Divider align="left"></Divider>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="viaja">
                                <b>Viaja:</b>
                            </label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.viaja ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="viaja"
                                value="true"
                                checked={state.viaja === "S"}
                                id="solo"
                                name="viaja"
                                onChange={(e) => {setState({ ...state, viaja: 'S' });}}
                            />
                            <label htmlFor="viaja" style={{ transform: "translate(10px,7px)" }}>
                                <b>Solo</b>
                            </label>
                        </div>
                        <div className="col-sm-2">
                            <RadioButton
                                className={req && !state.viaja ? 'p-invalid'  : "p-inputtext-sm mb-1"}
                                inputId="viaja2"
                                value="true"
                                checked={state.viaja === "A"}
                                id="acompañado"
                                name="viaja"
                                onChange={(e) => {setState({ ...state, viaja: 'A' });}}
                            />
                            <label
                                htmlFor="viaja2"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>Acompañado</b>
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <br />
                                {req && !state.viaja && <small className="p-error">{msjRequeridos}</small>}
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <Divider align="left"></Divider>
                         <Toast ref={msjEmergente} />
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="acompaniante">
                                    <b>Información del acompañante:</b>
                                </label>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <Toolbar className="mb-4" left={btnAgregarViajaIzquierdo}></Toolbar>
                                        <DataTable value={state.acompaniante ? state.acompaniante.filter((val) => val.estado === 'A') : null} ref={dt}  responsiveLayout="scroll"
                                                    emptyMessage = "No hay datos para mostar. Ingrese los acompañantes" >
                                            <Column  field="cedula" header="Cédula" sortable style={{ minWidth: '12rem' }}></Column>
                                            <Column  field={(dt)=>{return dt.pNombre +" "+ dt.pApellido +" "+ dt.sApellido}} header="Nombre completo" sortable style={{ minWidth: '12rem' }}></Column>
                                            <Column body={btnsColmDercTabla} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider align="left"></Divider>
                    <div className='container'>
                        <div className="row justify-content-between">
                            <div className="col-4">
                                <ButtonSiguiente dir="informacionencargado" nom="anterior" icono="pi pi-arrow-left" />
                            </div>
                            <div className="col-4">
                                <Button label="Matrícular" icon="pi pi-save" className="p-button-sm p-button-rounded p-button-info"
                                    onClick={validarRequeridos} />
                            </div>
                        </div>
                    </div>

                    
                    <Dialog  visible={borrarAcom} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={btnsModalBorrar} onHide={cerrarModalBorrar}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {acompanianteEdit && (
                                <span>
                                    Estas seguro que quieres eliminar a <b>{acompanianteEdit.pNombre+ " "+ acompanianteEdit.sApellido}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={verModalMsj} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsj} onHide={cerrarModalMsj}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>
                                El acompañante no se encuantra registrado.
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={verModalMatri} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsjMatricula} onHide={cerrarModalMsjMatricula}>
                        <div className="confirmation-content">
                            {matriCorrecta && 
                                <div> 
                                    <i className="pi pi-check-circle" style={{ fontSize: '2rem', marginRight: '15px' }} />
                                    <span >
                                    {msjModal.confirmar}
                                    </span> <br/><br/>
                                    <i className="pi pi-download" style={{ fontSize: '2rem', marginRight: '15px' }} />
                                    <span >
                                        {msjModal.imprimir}
                                    </span>
                                </div> 
                            }
                            {!matriCorrecta && 
                                <div>
                                    <i className="pi pi-times-circle" style={{ fontSize: '2rem', marginRight: '15px' }} />
                                    <span >
                                    {msjModal}
                                    </span>
                                </div>
                            }
                            
                        </div>
                    </Dialog>

                    <Dialog visible={verCargando} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cargando..." modal >
                        <Cargando/>
                    </Dialog>

                    <Dialog visible={verModal} style={{ width: '800px' }} header="Datos del acompañante" modal className="p-fluid" footer={btnsModal} onHide={cerrarModal} >
                    <div className="form-demo" style={{ height: 'auto' }}>
                        <span className="titleBlack">Información Personal</span>
                        <br />
                        <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                            <div className="row ">
                                <div className="col-sm offset-md-2">
                                    <div className="field">
                                        <label><b>Cédula:</b></label>{" "}
                                        <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                            <InputText
                                                ref={inputRefs[0]}
                                                onKeyDown={(event)=>compoSiguente(event, 0)}
                                                style={{ width: '30px' }}
                                                id="cedula"
                                                className={ requerido && !acompanianteEdit.cedula ? 'p-invalid': "p-inputtext-sm mb-2"}
                                                value={acompanianteEdit.cedula}
                                                autoFocus
                                                keyfilter = {/^[a-zA-Z0-9]*$/}
                                                maxLength={45}
                                                onChange={(e) =>
                                                    datosDeEntrada(e, 'cedula')}
                                                required />
                                            <Button
                                                icon="pi pi-search"
                                                id="Buscar2"
                                                className="p-button-warning"
                                                onClick={async () => {
                                                     await buscarViajaCon();
                                                }} />
                                        </div>
                                        {requerido && !acompanianteEdit.cedula && <small className="p-error">{msjRequeridos}</small>}
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
                                                className={ requerido && !acompanianteEdit.pNombre ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                                value={acompanianteEdit.pNombre}
                                                maxLength={45}
                                                onChange={(e) =>
                                                    datosDeEntrada(e, 'pNombre')}
                                                required
                                                style={{ width: '90%' }} />
                                            {requerido && !acompanianteEdit.pNombre && <small className="p-error">{msjRequeridos}</small>}
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
                                                value={acompanianteEdit.sNombre}
                                                style={{ width: '90%' }}
                                                maxLength={45}
                                                onChange={(e) =>
                                                    datosDeEntrada(e, 'sNombre')}
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
                                                className={ requerido && !acompanianteEdit.pApellido ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                                value={acompanianteEdit.pApellido}
                                                style={{ width: '90%' }}
                                                maxLength={45}
                                                onChange={(e) =>
                                                    datosDeEntrada(e, 'pApellido')}
                                                required />
                                            {requerido && !acompanianteEdit.pApellido && <small className="p-error">{msjRequeridos}</small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="field">
                                        <label><b>Segundo apellido:</b></label>
                                        <div>
                                            <InputText
                                                ref={inputRefs[4]}
                                                onKeyDown={(event)=>compoSiguente(event, 4)}
                                                id="sApellido"
                                                className={ requerido && !acompanianteEdit.sApellido ? 'p-invalid'  : "p-inputtext-sm mb-2"}
                                                value={acompanianteEdit.sApellido}
                                                style={{ width: '90%' }}
                                                maxLength={45}
                                                onChange={(e) =>
                                                    datosDeEntrada(e, 'sApellido')}
                                                required />
                                            {requerido && !acompanianteEdit.sApellido && <small className="p-error">{msjRequeridos}</small>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   </Dialog>     
                </div>
                <br />

            </div>
        </div>
    );
}
