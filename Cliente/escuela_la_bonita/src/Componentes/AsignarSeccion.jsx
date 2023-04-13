import React, { useState, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';

import { ObtenerEstudianteGrado } from '../Persistencia/EstudianteService';
import { Cargando, tiempoCargando } from "../Componentes/Utils";
import { agregarSeccionEstudiante } from "../Persistencia/EstudianteService";


export function AsignarSecciones(){
    const grados = [
        { name: "Primero" },
        { name: "Segundo" },
        { name: "Tercero" },
        { name: "Cuarto" },
        { name: "Quinto" },
        { name: "Sexto" },
    ];

    const [verModalBorrarSec, setVerModalBorrarSec] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [gradoBuscar, setGradoBuscar] = useState();
    const [verCargando, setVerCargando] = useState(false);
    const [verModalMsj, setVerModalMsj] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [icono, setIcono] = useState(false);
    const [verModalAsigSec, setVerModalAsigSec] = useState(false);
    const [columnaSec, setColumnaSec] = useState([]);
    const [cantSecciones, setCantSecciones] = useState(0);
    const [cantEstSec, setCantEstSec] = useState({});
    const [verBtnAsig, setVerBtnAsig] = useState(false);
    const [verBtnAsigElim, setVerBtnAsigElim] = useState(true);
    const [requerido, setRequerido] = useState(false);
    const dt = useRef(null);

    
    console.log("Estudiantes ",estudiantes);
    console.log("cantSec ", cantSecciones);
    console.log("cantEstSec ", cantEstSec);

    const buscarEstudiantesGrado= async ()=>{
        if(gradoBuscar){
            setVerCargando(true);
            const datos = await ObtenerEstudianteGrado(gradoBuscar);
            
            if(datos !== null){
                //se le agrega el número a cada estudiante y se saca la catidad de secciones que son
                const datosNum = datos.map((item, index)=>{
                    //se valida si la sección del estudiante es mayor a la sección actual, es sacar el numero más alto
                    if(item.seccion > cantSecciones){
                        setCantSecciones(item.seccion);
                    }
                    return {...item, numero: index+1}});
                    //contabiliza los estudiante por seccion y retorna un objeto con seccion y cantidad. ej: {1: 3}
                    const cantEstXSecc = datos.reduce((acumulador, estudiante) => {
                        if (acumulador[estudiante.seccion]) {
                          acumulador[estudiante.seccion]++;
                        } else {
                          acumulador[estudiante.seccion] = 1;
                        }
                        return acumulador;
                      }, {});

                setTimeout(()=>{
                    setEstudiantes(datosNum);
                    setVerCargando(false);
                    setCantEstSec(cantEstXSecc);
                }, tiempoCargando);
            }else{
                setTimeout(()=>{
                    setMensaje("Se produjo un problema al consultar los datos.");
                    setVerCargando(false);
                    setVerModalMsj(true);
                }, tiempoCargando);
            }

        }else 
            setRequerido(true);
    }

    const modificarSeccionEstu = async (rowData, valor)=>{
        if (rowData.cedula.trim()) {
            let estu = [...estudiantes];
            let edit = {...rowData}
            const index = buscarXId(edit.cedula);
            edit.seccion = valor;
            estu[index] = edit;
            setEstudiantes(estu);
        }

    }

    const buscarXId = (cd) => {
        let index = -1;
        for (let i = 0; i < estudiantes.length; i++) {
            if (estudiantes[i].cedula === cd) {
                index = i;
                break;
            }
        }
        return index;
    }
    
    const agredarColumnaSec= async ()=>{
        setCantEstSec({...cantEstSec, [cantSecciones]: 0})
        setVerBtnAsig(true);
        setVerBtnAsigElim(true);
        let newColumn = {};
        if(!verBtnAsig){
            newColumn = {};
            let column = []
            for(let i=1; i <= cantSecciones+1; i++){
                newColumn = { field:`col${i}`, header: `Sección ${i} ` };
                column.push(newColumn);
                //Total ${[i] in cantEstSec? cantEstSec[i]: 0 }
               
            }
            setColumnaSec(column);
            setCantEstSec({...cantEstSec, [cantSecciones+1]: 0})
            setCantSecciones(cantSecciones +2);
        }else{
            setCantEstSec({...cantEstSec, [cantSecciones]: 0})
            newColumn = { field:`col${cantSecciones}`, header: `Sección ${cantSecciones} ` };
            setColumnaSec([...columnaSec, newColumn]);
            setCantSecciones(cantSecciones +1);
            //Total ${[cantSecciones] in cantEstSec? cantEstSec[cantSecciones]: 0}
            
        }
        
    }

    const eliminarSeccion = () =>{
        let secciones = [...columnaSec];
        let listEstu = [...estudiantes]
        secciones.pop();

        for(let i=0; i < listEstu.length; i++){
            if(listEstu[i].seccion === cantSecciones-1){
                listEstu[i].seccion = null;
            }
        }
        setEstudiantes(listEstu);
        setColumnaSec(secciones);
        setCantSecciones(cantSecciones-1);
        setVerModalBorrarSec(false);
        setVerBtnAsigElim(false);


    }

    const balancearSeccion = () =>{
        let datos = [...estudiantes];
        //se obtiene la cant de estudiante por sección. Se le resta uno porque trae más una sección, 
        //esto por el fincionamiento de agregar secciones
        let cantEstXsec = Math.floor(datos.length / (cantSecciones-1));
        let seccion = cantSecciones-1;
        let contador = 1;
        for(let i = datos.length -1; i >= 0; i-- ){
            if(contador > cantEstXsec){
                contador = 1;
                seccion --;
            }
            datos[i].seccion = seccion;
            contador ++;
        }
        setEstudiantes(datos);
        setCantSecciones(cantSecciones - 1);
        setVerModalAsigSec(false);
    }

    const guardarDatos = async () =>{
        setVerCargando(true);
        let condicion = true;
        for( const dt of estudiantes){
            if(dt.seccion === null){
                condicion = false; 
                setTimeout(()=>{
                    setMensaje("Hay estudiantes sin sección asignada");
                    setIcono(false);
                    setVerCargando(false);
                    setVerModalMsj(true);
                }, tiempoCargando);
                
            }
        };
        if(condicion){
            for(const dt of estudiantes){
                const res = await agregarSeccionEstudiante(dt);
                if(res != null){
                    condicion = false; 
                    setTimeout(()=>{
                        setMensaje(res);
                        setIcono(false);
                        setVerCargando(false);
                        setVerModalMsj(true);
                    }, tiempoCargando);
                }
            }
            if(condicion){
                setTimeout(()=>{
                    setMensaje("Datos guardatos correctamente");
                    setIcono(true);
                    setVerCargando(false);
                    setVerModalMsj(true);
                }, tiempoCargando);
            }

        }
    }

    const buscarXEnter = (event) =>{
        event.preventDefault();
        event.preventDefault();
        if(event.key === 'Enter'){
            
            buscarEstudiantesGrado();
            //document.getElementById("Grado").focus(false);
        }
    }


    const cerrarModalBorrar = () => {
        setVerModalBorrarSec(false);
    }

    const cerrarModalMsj = () => {
        setVerModalMsj(false);
        if(icono){
            window.location.reload();
        }
        
        
    }

    const cerrarModalAsignarSec = () => {
        setVerModalAsigSec(false);
    }

    const mostrarModalBorrarSec = ()=>{
        setVerModalBorrarSec (true)
    }


   const radioButtonSec = (valor)=>(rowData) => {
    return (
        <React.Fragment>
            <RadioButton
                inputId="seccion"
                value={valor}
                checked={rowData.seccion === valor}
                id="Seccion"
                name={rowData.cedula}
                onChange={(e)=>{modificarSeccionEstu(rowData ,e.value)}} />
        </React.Fragment>
    );
}

    const btnAgregarSecIzquierdo = (
            <React.Fragment>
                <Button label="Agregar Sección" icon="pi pi-plus" outlined className="p-button-success mr-2" disabled={(estudiantes.length > 0) ? false : true} onClick={agredarColumnaSec} />
                {(verBtnAsig && verBtnAsigElim) && <Button label="Asignar Sección" icon="pi pi-fw pi-check" outlined  onClick={()=>{setVerModalAsigSec(true)}} />}
            </React.Fragment>
        )


    const btnEliminarSecDerecho = (
        <React.Fragment>
            <Button label="Eliminar Sección" icon="pi pi-trash" outlined  className="p-button-danger " disabled={(estudiantes.length > 0) ? false : true} onClick={mostrarModalBorrarSec} />
        </React.Fragment>
    )

    const btnsModalBorrar = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={cerrarModalBorrar} />
            <Button label="Si" icon="pi pi-check" outlined severity="danger" onClick={eliminarSeccion} />
        </React.Fragment>
    );

    const btnsModalAsignarSec = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={cerrarModalAsignarSec} />
            <Button label="Confirmar" icon="pi pi-check" outlined severity="danger" onClick={balancearSeccion} />
        </React.Fragment>
    );

    const btnsModalMsj = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" outlined className="p-button-text"  onClick={cerrarModalMsj} />
        </React.Fragment>
    );

    return(
    <div className="form-demo" style={{ height: 'auto' }}>
        <div className="container" >
            <div className="row ">
                <div className="col-sm offset-md-2">
                    <div className="field">
                        <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                            <Dropdown
                                inputId="dropdown"
                                name="Grado"
                                id="dropDown"
                                onKeyDown={buscarXEnter}
                                className={requerido && !gradoBuscar? 'p-invalid'  : "p-inputtext-sm mb-2"} 
                                value={gradoBuscar}
                                options={grados}
                                placeholder="Grado"
                                onChange={(e)=>{setGradoBuscar(e.target.value)}}
                                optionLabel="name"
                                optionValue="name"
                                style={{ width: 'auto' }} />
                                
                            <Button
                                outlined
                                icon="pi pi-search"
                                id="Buscar2"
                                className="p-button-warning"
                                onClick={buscarEstudiantesGrado}/>
                        </div>
                    </div>
                </div>
                {requerido && !gradoBuscar && <small className="p-error">Es necesario seleccionar un grado</small>}
            </div>
            
             <div className="container">
                <Divider align="left"></Divider>
                <div className="row">
                    <div className="col-sm-4">
                        <label className="acompaniante">
                            <b>Lista de estudiantes:</b>
                        </label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <Toolbar className="mb-4" left={btnAgregarSecIzquierdo} right={btnEliminarSecDerecho}></Toolbar>
                                <DataTable value={estudiantes} ref={dt}  responsiveLayout="scroll" 
                                 emptyMessage = "No hay datos para mostar. Selecciona un grado y cargue los datos" >
                                    <Column  field="numero" style={{ minWidth: '2rem' }}></Column>
                                    <Column  field="cedula" header="Cédula"  style={{ minWidth: '8rem' }}></Column>
                                    <Column  field="nombre" header="Nombre" style={{ minWidth: '12rem' }}></Column>
                                    <Column  field="seccion" header="Sección asignada" exportable={false} style={{ minWidth: '6rem' }}></Column>
                                    {columnaSec.map((col, indx) => (
                                        <Column key={col.field} body={radioButtonSec(indx+1)} header={col.header} style={{ minWidth: '8rem' }}/>
                                    ))}
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <Button label="Guardar"  icon="pi pi-save" className="p-button-sm p-button-rounded p-button-info" 
                        onClick={()=>{  guardarDatos()}}
                    />
                    </div> 
                </div>
            </div>
            <Dialog visible={verModalBorrarSec} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={btnsModalBorrar} onHide={cerrarModalBorrar}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>
                            Esta seguro que quiere eliminar la <b>sección {cantSecciones-1}</b>?
                        </span>
                </div>
            </Dialog>

            <Dialog visible={verModalMsj} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsj} onHide={cerrarModalMsj}>
                <div className="confirmation-content">
                    <i className={ icono ? "pi pi-check-circle" : "pi pi-exclamation-triangle mr-3" } style={{ fontSize: '2rem', marginRight: '15px' }} />
                    <span>
                        {mensaje}
                    </span>
                </div>
            </Dialog>

            <Dialog visible={verModalAsigSec} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalAsignarSec} onHide={cerrarModalAsignarSec}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        Esta opción distribuirá a los estudiantes de forma igualada entre las distintas secciones 
                        existentes.
                        <br/><br/>
                        ¿Está deacuerdo en continuar?
                    </span>
                </div>
            </Dialog>

            <Dialog visible={verCargando} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cargando..." modal >
                <Cargando/>
            </Dialog>

        </div> 
    </div>
    );
}