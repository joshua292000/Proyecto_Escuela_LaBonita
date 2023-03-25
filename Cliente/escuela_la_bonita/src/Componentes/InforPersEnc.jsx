import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { PaisService, ProvinciaService, CantonService, DistritoService } from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { addLocale } from 'primereact/api';
import { ButtonSiguiente } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";

import { ObtenerEncargadosEstu, ObtenerEncargado } from '../Persistencia/EncargadoService';
import { infoEstudiante } from '../AppContext/providerEstudiante';
import { infoEncargado } from '../AppContext/providerInfoEncargado';


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
    canton: null, cedula: "", correo: "", direccion: "",
    distrito: null, escolaridad: "", estadoCivil: "", fechaNaci: "",
    lugarNacimiento: "", lugarTrabajo: "", ocupacion: "", pApellido: "",
    pNombre: "", parentesco: "", provincia: null, sApellido: "",
    sNombre: "", sexo: "", telefono: "", viveConEstu: ""
};

export function InfoEncargado() {

    const Distrito = new DistritoService();
    const Canton = new CantonService();
    const Provincia = new ProvinciaService();
    const Pais = new PaisService();
    const [countries, setCountries] = useState([]);
    const [pro, setProvincia] = useState([]);
    const [Can, setCanton] = useState([]);
    const [Dis, setDistrito] = useState([]);
    const Estado = [
        { name: 'Soltero', code: 'S' },
        { name: 'Casado', code: 'C' },
        { name: 'Unión libre', code: 'U' },
        { name: 'Divorciado(a)', code: 'D' },
        { name: 'Viudo(a)', code: 'V' },
        { name: 'Separado(a)', code: 'E' }
    ];
    const escolaridad = [
        { name: 'Ninguna' },
        { name: 'Primaria incompleta' },
        { name: 'Primaria completa' },
        { name: 'Secundaria incompleata' },
        { name: 'Secundaria completa' },
        { name: 'Técnico Profesional' },
        { name: 'Universitaria' }
    ];
    const parentesco = [
        { name: 'Madre' },
        { name: 'Padre' },
        { name: 'Hermano(a)' },
        { name: 'Abuelo(a)' },
        { name: 'Tío(a)' },
        { name: 'Madrastra' },
        { name: 'Padrastro' },
        { name: 'Encargado(a) legal' }
    ];
    const [estu] = useContext(infoEstudiante);
    const [encargado, setEncargado] = useContext(infoEncargado);//almacena toda la información de los encargados
    const [encarEdit, setEncarEdit] = useState(datosVacios);//contendrá la información del encargado que se edite o se cree
    const [verModal, setVerModal] = useState(false);//control booleano de la pantalla modal. true se muestra, false se oculta
    const [borrarEnc, setBorrarEnc] = useState(false);//controla el estado de visibilidad de la modal de confirmacion para eliminar el encargado
    const [verModalMsj, setVerModalMsj] = useState(false);
    const [requerido, setRequerido] = useState(false);
    const [correoValido, setCorreoValido] = useState(true);

    const navegar = useNavigate();
    const inputRefs = [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null)
    ];

    const msjEmergente = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        Pais.getPais().then(data => setCountries(data));
        Provincia.getProvincia().then(data => setProvincia(data));

        if(encargado.length === 0 && "id" in estu){
            const consultarEncargado = async () => {
                const res = await ObtenerEncargadosEstu({ idEst: parseInt(estu.id) });
                const data = await separarContactos(res);
                setEncargado(data);
            }
            consultarEncargado();

        }
        
    }, [])
    useEffect(()=>{
        setCorreoValido(validarCorre());

    },[encarEdit.correo])

    useEffect(() => {
        if (encarEdit.provincia) {
            Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === encarEdit.provincia)));
            Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === encarEdit.canton)));
        }
    }, [encarEdit.provincia]);

    console.log("state", encarEdit);
    console.log("datos", encargado);
    
    const validarCorre = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(encarEdit.correo);
    };

    const buscarEncargado = async ()=> {
        const res = await ObtenerEncargado(encarEdit.cedula);
        if(res.cedula === null){
          setVerModal(false);
          setVerModalMsj(true);
        }else{
          setEncarEdit({ ...res });
 
        }           
        
    }

    const separarContactos = async (res) => {
        const contactos = await res.map((dt) => { return dt.contactos.split("-") })
        for (var i = 0; i < res.length; i++) {
            const dt = contactos[i];
            for (var j = 0; j < dt.length; j++) {
                if (!isNaN(dt[j])) {
                    res[i].telefono = dt[j];
                } else {
                    res[i].correo = dt[j];
                }

            }
        }
        return res;
    }

    const guardarEncargado = () => {
        setRequerido(true);
        if (encarEdit.cedula.trim()) {
            let datos = [...encargado];
            let editados = { ...encarEdit };
            if (encarEdit.cedula) {
                const index = buscarXId(encarEdit.cedula);
                if (index >= 0) {
                    editados.estado = "A";
                    datos[index] = editados;
                    msjEmergente.current.show({ severity: 'success', summary: 'Actualización', detail: 'Encargado actualizado', life: 2500 });
                } else {
                    editados.estado = "A";
                    datos.push(editados);
                    msjEmergente.current.show({ severity: 'success', summary: 'Registrado', detail: 'Encargado Registrado', life: 2500 });
                }

            } else {
                msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'feiled', summary: 'Se produjo un problema', detail: 'Encargado NO Registrado', life: 2500 });
            }
            setEncargado(datos);
            setVerModal(false);
            setEncarEdit(datosVacios);
        }
    }
    const buscarXId = (cd) => {
        let index = -1;
        for (let i = 0; i < encargado.length; i++) {
            if (encargado[i].cedula === cd) {
                index = i;
                break;
            }
        }

        return index;
    }


    const crearNuevo = () => {
        setEncarEdit(datosVacios);
        setVerModal(true);
        setRequerido(false);
    }



    const editarEncargado = async (data) => {
        await setEncarEdit({ ...data });
        setVerModal(true);
    }

    const confirmarBorrarEncargado = (data) => {
       setBorrarEnc (true);
       setEncarEdit(data);

   }
    const borrarEncargado = async () => {
        if (encarEdit.cedula.trim()) {
            let datos = [...encargado];
            if (encarEdit.cedula) {
                const index = await buscarXId(encarEdit.cedula);
                datos[index].estado = 'I';
                msjEmergente.current.show({ severity: 'success', summary: 'Confirmación', detail: 'Encargado borrado correctamente', life: 3000 });
            } else {
                msjEmergente.current.show({ severity: 'feiled', summary: 'Se produjo un problema', detail: 'Encargado NO eliminado', life: 3000 });
            }
            setEncargado(datos);
            setEncarEdit(datosVacios);
            setBorrarEnc(false);
        }
    }


    const cerrarModal = () => {
        setVerModal(false);
        setRequerido(false);
    }

    const cerrarModalBorrar = () => {
        setBorrarEnc(false);
    }

    const cerrarModalMsj = () => {
        setVerModalMsj(false);
        setVerModal(true);
        document.getElementById("cedula").focus();
    }

    const datosDeEntrada = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...encarEdit };
        _product[`${name}`] = val;

        setEncarEdit(_product);
    }
   
  
    const compoSiguente = async (event, index) => {
        console.log("enter1");
      if (event.key === 'Enter') {
        event.preventDefault();
        const _sigInput = index + 1;
        if(index === 0){
           await buscarEncargado()
        }
        else if (_sigInput < inputRefs.length) {
          inputRefs[_sigInput].current.focus();
        }
      }
    }

    const cerrarModalMsjEnter =  async (event) => {
        console.log("enter2");
        if (event.key === 'Enter') {
            event.preventDefault();
            setVerModalMsj (false);
            setVerModal(true);
            document.getElementById("cedula").focus();
        }
    }

    const validarRequerido =()=>{
        let estado = encargado.some(obj => obj.estado === "A");
        if(estado){
            //avanza de pagina
            console.log("entro4");
            navegar("/informacionestudiante");
        }else{
            msjEmergente.current.show({ severity: 'warn', summary: 'Datos requeridos', detail: 'Es necesario agregar al menos un encargado', life: 3000});
        }
    }

    const btnAgregarEncIzquierdo = () => {
        return (
            <React.Fragment>
                <Button label="Agregar encargado" icon="pi pi-plus" className="p-button-success mr-2" onClick={crearNuevo} />
            </React.Fragment>
        )
    }
    // btns de editar y eliminar de la columna derecha de la tabla
    const btnsColmDercTabla = (rowData) => {
        return (
            <React.Fragment>
                {/*boton de editar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => { editarEncargado(rowData) }}
                />
                {/*boton de eliminar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={()=> {confirmarBorrarEncargado(rowData)}}/>
            </React.Fragment>
        );
    }

    const btnsModal = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={cerrarModal} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={guardarEncargado} />
        </React.Fragment>
    );

    const btnsModalBorrar = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={cerrarModalBorrar} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={borrarEncargado} />
        </React.Fragment>
    );

    const btnsModalMsj = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" className="p-button-text" autoFocus onKeyDown={cerrarModalMsjEnter} onClick={cerrarModalMsj} />
        </React.Fragment>
    );
    return (
        <div className="datatable-crud-demo">
            <Toast ref={msjEmergente}/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <Toolbar className="mb-4" left={btnAgregarEncIzquierdo}></Toolbar>
                            <DataTable ref={dt} value={encargado.filter((val) => val.estado === 'A') } responsiveLayout="scroll" >
                                <Column field="cedula" header="Cédula" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field={(dt)=>{return dt.pNombre +" "+ dt.pApellido}} header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="telefono" header="Telefono" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="correo" header="Correo" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column body={btnsColmDercTabla} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
                
            </div>

            <Dialog visible={borrarEnc} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={btnsModalBorrar} onHide={cerrarModalBorrar}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {encarEdit && (
                        <span>
                            Estas seguro que quieres eliminar a <b>{encarEdit.pNombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={verModalMsj} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsj} onHide={cerrarModalMsj}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        El encargado no se encuantra registrado.
                    </span>
                </div>
            </Dialog>

            <Dialog visible={verModal} style={{ width: '800px' }} header="Datos del encargado" modal className="p-fluid" footer={btnsModal} onHide={cerrarModal} >
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
                                            onKeyDown={(event)=>compoSiguente(event,0)}
                                            style={{ width: '30px' }}
                                            id="cedula"
                                            keyfilter = {/^[^\s]+$/}
                                            maxLength={45}
                                            className= { requerido && !encarEdit.cedula ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            value={encarEdit.cedula}
                                            autoFocus
                                            onChange={(e) =>
                                                datosDeEntrada(e, 'cedula')}
                                            required />
                                        <Button
                                            icon="pi pi-search"
                                            id="Buscar2"
                                            className="p-button-warning"
                                            onClick={async () => {
                                                await buscarEncargado();
                                                
                                            }} />
                                        
                                    </div>
                                    {requerido && !encarEdit.cedula && <small className="p-error">Cédula es requerido</small>}
                                </div>
                            </div>

                            <div className="col-sm  ">
                                <div className="field">
                                    <label><b>Fecha nacimiento:</b></label>{" "}
                                    <div className="field col-12 md:col-4 p-float-label">
                                        <Calendar
                                            className=  { requerido && !encarEdit.fechaNaci ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            inputId="calendar" id="fnacimiento"
                                            value={new Date(encarEdit.fechaNaci)}
                                            locale="es"
                                            required
                                            onChange={(e) =>
                                                setEncarEdit({ ...encarEdit, fechaNaci: e.value.toLocaleDateString('sv-SE')})}
                                            touchUI />
                                        {requerido && !encarEdit.fechaNaci && <small className="p-error">Fecha de nacimiento es requerido</small>}
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
                                            ref={inputRefs[1]}
                                            onKeyDown={(event)=>compoSiguente(event, 1)}
                                            id="pNombre"
                                            className= { requerido && !encarEdit.pNombre  ? 'p-invalid'  : "p-inputtext-sm block mb-2"}   // "p-inputtext-sm block mb-2"
                                            value={encarEdit.pNombre}
                                            maxLength={45}
                                            onChange={(e) =>
                                                datosDeEntrada(e, 'pNombre')}
                                            required
                                            style={{ width: '90%' }} />
                                        {requerido && (!encarEdit.pNombre || encarEdit.pNombre === '') && <small className="p-error">Primer nombre es requerido</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="field">
                                    <label><b>Segundo nombre:</b></label>
                                    <div>
                                        <InputText
                                            ref={inputRefs[2]}
                                            onKeyDown={(event)=>compoSiguente(event,2)}
                                            id="sNombre"
                                            className="p-inputtext-sm block mb-2"
                                            maxLength={45}
                                            value={encarEdit.sNombre}
                                            style={{ width: '90%' }}
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
                                            onKeyDown={(event)=>compoSiguente(event,3)}
                                            id="pApellido"
                                            className={ requerido && !encarEdit.pApellido ? 'p-invalid'  : "p-inputtext-sm block mb-2"}  
                                            value={encarEdit.pApellido}
                                            style={{ width: '90%' }}
                                            maxLength={45}
                                            onChange={(e) =>
                                                datosDeEntrada(e, 'pApellido')}
                                            required />
                                        {requerido && !encarEdit.pApellido && <small className="p-error">Primer apellido es requerido</small>}
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
                                            className={ requerido && !encarEdit.sApellido ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            value={encarEdit.sApellido}
                                            style={{ width: '90%' }}
                                            maxLength={45}
                                            onChange={(e) =>
                                                datosDeEntrada(e, 'sApellido')}
                                            required />
                                        {requerido && !encarEdit.sApellido && <small className="p-error">Segundo apellido es requerido</small>}
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
                                            className={ requerido && !encarEdit.provincia ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            value={encarEdit.provincia}
                                            optionValue="code"
                                            options={pro}
                                            placeholder="Provincia"
                                            required
                                            onChange={(e) =>
                                                setEncarEdit({ ...encarEdit, provincia: e.target.value, })}
                                            optionLabel="name"
                                            style={{ width: 'auto' }} />
                                        {requerido && !encarEdit.provincia && <small className="p-error">Provincia es requerido</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="field">
                                    <label><b>Cantón:</b></label>
                                    <div>
                                        <Dropdown
                                            inputId="dropdown"
                                            value={encarEdit.canton}
                                            className={ requerido && !encarEdit.canton ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            name="Canton"
                                            id="Canton"
                                            placeholder="Cantón"
                                            optionValue="code"
                                            required
                                            options={Can}
                                            onClickCapture={(e) =>
                                                Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === encarEdit.provincia)))}
                                            onChange={(e) =>
                                                setEncarEdit({ ...encarEdit, canton: e.target.value })
                                            }
                                            optionLabel="name"
                                            style={{ width: 'auto' }} />
                                        {requerido && !encarEdit.canton && <small className="p-error">Canton es requerido</small>}
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
                                            value={encarEdit.distrito}
                                            className={ requerido && !encarEdit.distrito ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                            options={Dis}
                                            required
                                            onClickCapture={(e) =>
                                                Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === encarEdit.canton)))}
                                            placeholder="Distrito"
                                            onChange={(e) =>
                                                setEncarEdit({ ...encarEdit, distrito: e.target.value })
                                            }
                                            optionLabel="name"
                                            style={{ width: 'auto' }} />
                                        {requerido && !encarEdit.distrito && <small className="p-error">Distrito es requerido</small>}
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
                                    ref={inputRefs[5]}
                                    onKeyDown={(event)=>compoSiguente(event, 5)}
                                    className={ requerido && !encarEdit.direccion ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                    value={encarEdit.direccion}
                                    maxLength={200}
                                    id="direccion"
                                    onChange={(e) =>
                                        datosDeEntrada(e, 'direccion')}
                                    rows={1}
                                    autoResize
                                    required
                                    style={{ transform: 'translateX(5px)', width: '98%' }} />
                                {requerido && !encarEdit.direccion && <small className="p-error">Dirección es requerido</small>}
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
                                    className= { requerido && !encarEdit.sexo ? 'p-invalid'  : ''} 
                                    inputId="city1"
                                    value="true"
                                    checked={encarEdit.sexo === "M"}
                                    id="Hombre"
                                    name="sexoEnc"
                                    onChange={() =>
                                        setEncarEdit({ ...encarEdit, sexo: "M" })} />
                                <label
                                    htmlFor="city1"
                                    style={{ transform: 'translate(10px,7px)' }}>
                                    <b>Hombre</b>
                                </label>
                            </div>
                            <div className="col-sm-2">
                                <RadioButton
                                    className= { requerido && !encarEdit.sexo ? 'p-invalid'  : ''} 
                                    inputId="city2"
                                    value="true"
                                    checked={encarEdit.sexo === "F"}
                                    id="Mujer"
                                    name="sexoEnc"
                                    onChange={() =>
                                        setEncarEdit({ ...encarEdit, sexo: "F" })} />
                                <label
                                    htmlFor="city2"
                                    style={{ transform: 'translate(10px,7px)' }}>
                                    <b>Mujer</b>
                                </label>
                            </div>
                            {requerido && !encarEdit.sexo && <small className="p-error">Sexo es requerido</small>}
                        </div>
                        <Divider align="left" ></Divider>
                        <div className="row">
                            <div className="col-auto">
                                <label><b>Lugar de nacimiento:</b></label>
                                <div>
                                    <Dropdown
                                        style={{ width: '100%' }}
                                        inputId="dropdown"
                                        name="lugarnacimiento"
                                        id="lugarnacimiento"
                                        className={ requerido && !encarEdit.lugarNacimiento ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                        filter showClear filterBy="name"
                                        placeholder="Lugar de nacimiento"
                                        optionValue="name"
                                        optionLabel="name"
                                        value={encarEdit.lugarNacimiento}
                                        options={countries}
                                        required
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'lugarNacimiento')}
                                    />
                                    {requerido && !encarEdit.lugarNacimiento && <small className="p-error">Lugar de nacimiento es requerido</small>}
                                </div>
                            </div>
                            <div className="col-auto">
                                <label><b>Estado Civil:</b></label>
                                <div>
                                    <Dropdown
                                        style={{ width: '100%' }}
                                        inputId="dropdown"
                                        className={ requerido && !encarEdit.estadoCivil ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                        placeholder="Estado Civil"
                                        name="EstadoCivil"
                                        id="EstadoCivil"
                                        optionLabel="name"
                                        optionValue="code"
                                        required
                                        value={encarEdit.estadoCivil}
                                        options={Estado}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'estadoCivil')
                                        }
                                    />
                                    {requerido && !encarEdit.estadoCivil && <small className="p-error">Estado civil es requerido</small>}
                                </div>
                            </div>
                        </div>
                        <Divider align="left" ></Divider>
                        <div className="row">
                            <div className="col">
                                <label><b>Contacto:</b></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <label><b>Correo Electrónico:</b></label>
                                <div>
                                    <InputText
                                        ref={inputRefs[6]}
                                        onKeyDown={(event)=>compoSiguente(event,6)}
                                        id="correo"
                                        value={encarEdit.correo}
                                        className={ !correoValido && encarEdit.correo ? 'p-invalid'  : "p-inputtext-sm block mb-2"}
                                        style={{ width: '70%' }}
                                        keyfilter={/[^\s]/}
                                        maxLength={50}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'correo')
                                        }

                                        required />
                                </div>
                                {!correoValido && encarEdit.correo && <small className="p-error">Correo invalido</small>}
                            </div>
                            <div className="col-sm">
                                <label><b>Número de Teléfono:</b></label>
                                <div>
                                    <InputText
                                        ref={inputRefs[7]}
                                        onKeyDown={(event)=>compoSiguente(event,7)}
                                        id="telefono"
                                        value={encarEdit.telefono}
                                        className="p-inputtext-sm block mb-2"
                                        keyfilter="num"
                                        style={{ width: '40%' }}
                                        maxLength={45}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'telefono')
                                        }
                                        required />
                                </div>
                            </div>
                        </div>
                        <Divider align="left" ></Divider>
                        <div className="row">
                            <div className="col">
                                <label><b>Información Laboral:</b></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <label><b>Escolaridad:</b></label>
                                <div>
                                    <Dropdown
                                        style={{ width: '100%' }}
                                        inputId="dropdown"
                                        className={ requerido && !encarEdit.escolaridad ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                        placeholder="Escolaridad"
                                        name="Escolaridad"
                                        id="Escolaridad"
                                        optionLabel="name"
                                        optionValue="name"
                                        value={encarEdit.escolaridad}
                                        options={escolaridad}
                                        required
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'escolaridad')}
                                    />
                                    {requerido && !encarEdit.escolaridad && <small className="p-error">Escolaridad es requerido</small>}
                                </div>
                            </div>
                            <div className="col-sm">
                                <label><b>Ocupación:</b></label>
                                <div>
                                    <InputText
                                    
                                        ref={inputRefs[8]}
                                        onKeyDown={(event)=>compoSiguente(event,8)}
                                        id="ocupacion"
                                        className={ requerido && !encarEdit.ocupacion ? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                        value={encarEdit.ocupacion}
                                        style={{ width: '90%' }}
                                        maxLength={45}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'ocupacion')}
                                        required />
                                    {requerido && !encarEdit.ocupacion && <small className="p-error">Ocupacion es requerido</small>}
                                </div>
                            </div>
                            <div className="col-sm">
                                <label><b>Lugar de Trabajo:</b></label>
                                <div>
                                    <InputText
                                        ref={inputRefs[9]}
                                        onKeyDown={(event)=>compoSiguente(event,9)}
                                        id="lugarTrabajo"
                                        className="p-inputtext-sm block mb-2"
                                        value={encarEdit.lugarTrabajo}
                                        style={{ width: '90%' }}
                                        maxLength={45}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'lugarTrabajo')}
                                        required />

                                </div>
                            </div>
                        </div>
                        <Divider align="left" ></Divider>
                        <div className="row">
                            <div className="col-sm">
                                <label className="pare"><b>Relación con el estudiante:</b></label>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-auto ">
                                <label><b>Parentesco:</b></label>
                                <div>
                                    <Dropdown
                                        style={{ width: '100%' }}
                                        inputId="dropdown"
                                        className={ requerido && !encarEdit.parentesco? 'p-invalid'  : "p-inputtext-sm block mb-2"} 
                                        placeholder="Parentesco"
                                        name="Parentesco"
                                        id="Parentesco"
                                        optionLabel="name"
                                        optionValue="name"
                                        value={encarEdit.parentesco}
                                        required
                                        options={parentesco}
                                        onChange={(e) =>
                                            datosDeEntrada(e, 'parentesco')}
                                    />
                                    {requerido && !encarEdit.parentesco && <small className="p-error">Parentesco es requerido</small>}
                                </div>
                            </div>
                            <div className="col-sm ">
                                <label><b>Vive con el Estudiante: </b></label>
                                <div className="col-sm-auto col-sm-5">
                                    <RadioButton
                                        className= { requerido && !encarEdit.viveConEstu ? 'p-invalid'  : ''} 
                                        inputId="viveS"
                                        value="true"
                                        checked={encarEdit.viveConEstu === "S"}
                                        id="viveS"
                                        name="vive"
                                        onChange={() =>
                                            setEncarEdit({ ...encarEdit, viveConEstu: "S" })} />
                                    <label
                                        htmlFor="viveS"
                                        style={{ transform: 'translate(10px,7px)' }}>
                                        <b>Si</b>
                                    </label>
                                </div>
                                <div className="col-sm-auto">
                                    <RadioButton
                                        className= { requerido && !encarEdit.viveConEstu ? 'p-invalid'  : ''} 
                                        inputId="viveN"
                                        value="true"
                                        checked={encarEdit.viveConEstu === "N"}
                                        id="No"
                                        name="vive"
                                        onChange={() =>
                                            setEncarEdit({ ...encarEdit, viveConEstu: "N" })} />
                                    <label
                                        htmlFor="city2"
                                        style={{ transform: 'translate(10px,7px)' }}>
                                        <b>No</b>
                                    </label>
                                </div>
                                {requerido && !encarEdit.viveConEstu && <small className="p-error">Éste campo es requerido</small>}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className='container'>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <ButtonSiguiente dir="Informacionpersonal" nom="anterior" icono="pi pi-arrow-left" />
                    </div>
                        <div className="col-4">
                        <Button  icon="pi pi-arrow-right" className="p-button-sm p-button-rounded p-button-info" 
                        onClick={()=>{ /*navegar("/informacionestudiante");*/ validarRequerido()
                    }}/>
                    </div> 
                </div>
           </div>
        </div>
        
        
    );

}




/*   <div className="field">
                <label htmlFor="cedula">Cedula</label>
                <InputText id="cedula" value={product.cedula} onChange={(e) => onInputChange(e, 'cedula')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.cedula })} />
                {submitted && !product.cedula && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                {submitted && !product.nombre && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="contacto">Num teléfono</label>
                <InputText id="contacto" value={product.contacto} onChange={(e) => onInputChange(e, 'contacto')} required className={classNames({ 'p-invalid': submitted && !product.contacto })} />
                {submitted && !product.contacto && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="estado">Estado</label>
                <InputText id="estado" value={product.estado} onChange={(e) => onInputChange(e, 'estado')} required className={classNames({ 'p-invalid': submitted && !product.estado })} />
                {submitted && !product.estado && <small className="p-error">Nombre es requerido.</small>}
            </div>*/