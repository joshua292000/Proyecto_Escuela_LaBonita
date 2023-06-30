import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { ObtenerFunAsigSeccion, ObtenerGradosSeccion, EliminarSecFuncionario, AgregarSecFuncionario } from '../Persistencia/EstudianteService';
import { Cargando, tiempoCargando } from "../Componentes/Utils";

import "../Estilos.css";

export function AsigSeccionProfes(){

    const [verModal, setVerModal] = useState(false);
    const [funcionario, setFuncionario] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [funcEdit, setFuncEdit] = useState({});
    const [secEdit, setSecEdit] = useState([]);
    const [verModalMsj, setVerModalMsj] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [icono, setIcono] = useState(false);
    const [verCargando, setVerCargando] = useState(false);
    
    
    const dt = useRef(null);
    const navegar = useNavigate();
    const cookies = new Cookies();

    useEffect(()=>{
        if(!cookies.get('Func_Id')){
            navegar("/");
        }else{
            setVerCargando(true);
            setTimeout(()=>{
                obtenerFuncionarios();
                setVerCargando(false);
            }, tiempoCargando);
        }
        
        
        
    }, []);

    console.log("Funcionarios", funcionario);
    console.log("FuncEdit", funcEdit);
    console.log("secEdit", secEdit);

    const obtenerFuncionarios = async () => {
        const func = await ObtenerFunAsigSeccion();
        const sec = await ObtenerGradosSeccion();
        
        if(func.length > 0 && sec.length > 0){
            cargarDatosObtenidos(func);
            setSecciones(sec);
        }else{
            //msj de error
        }
    }
    

    const asignarSecciones = (rowData) => {
        setVerModal(true);
        setFuncEdit(rowData);
        setSecEdit(rowData.secciones);
    }

    const cerrarModal = () => {
        setVerModal(false);
        setFuncEdit([]);
        setSecEdit([]);
    }
    
    const cerrarModalMsj = () => {
        setVerModalMsj(false);
        if(icono){
            setIcono(false);
        }
        
    }

    const cargarDatosObtenidos = async (props) =>{
        let datos = [];
        let sec = []
        props.forEach(dt => {
            if(dt.secciones === null){
                dt.secciones = [];
            }else{
                sec = dt.secciones.split(',');
                dt.secciones = sec.map((cadena)=>parseInt(cadena));
            }
            datos.push(dt);
        });
        setFuncionario(datos);
    }

    const agregarSeccion = async ()=>{
        if (funcEdit.cedula.trim()) {
            let func = [...funcionario];
            let edit = {...funcEdit}
            const index = buscarFuncXId(edit.cedula);
            edit.secciones = secEdit;
            func[index] = edit;
            setFuncionario(func);
            setFuncEdit([]);
            setSecEdit([]);
            setVerModal(false);
        }

    }

    const guardarSeccion = async (e)=>{
        let seccion = [...secEdit];
        if(e.checked)
            seccion.push(e.value);
        else
        seccion.splice(seccion.indexOf(e.value), 1);
        setSecEdit(seccion);

    }

    const buscarFuncXId = (cd) => {
        let index = -1;
        for (let i = 0; i < funcionario.length; i++) {
            if (funcionario[i].cedula === cd) {
                index = i;
                break;
            }
        }
        return index;
    }

    const guardarDatos = async () =>{
        setVerCargando(true);
        let res = null;
        for (let i=0; i < funcionario.length; i++){
            if(funcionario[i].secciones.length > 0){
                if(res === null){
                    res = await EliminarSecFuncionario(funcionario[i].idFun);
                    for(let j=0; j < funcionario[i].secciones.length; j++){
                        if(res === null){
                            res = await AgregarSecFuncionario({idFun: funcionario[i].idFun,
                                idSec: funcionario[i].secciones[j]});
                        }else
                            break;
                    }
                }else
                    break;
            }
        }
        if(res !== null){
            setTimeout(()=>{
                setMensaje(res);
                setVerCargando(false);
                setVerModalMsj(true);
            }, tiempoCargando);

        }else{
            setTimeout(()=>{
                setMensaje('Datos registrados correctamente');
                setIcono(true);
                setVerCargando(false);
                setVerModalMsj(true);
            }, tiempoCargando);
        }
        
        
    }

    const checkConfirmacion = (rowData) => {
        return (
            <React.Fragment>
                {rowData.secciones.length > 0 && <i className="pi pi-check"></i>}
            </React.Fragment>
        );
    }
    
     // btn de editar de la columna derecha de la tabla
     const btnsColmDercTabla = (rowData) => {
        return (
            <React.Fragment>
                {/*boton de editar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => { asignarSecciones(rowData) }}
                />
            </React.Fragment>
        );
    }
     

    const btnsModal = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined className="p-button-text" onClick={cerrarModal} />
            <Button label="Guardar" icon="pi pi-check" outlined className="p-button-text" onClick={agregarSeccion} />
        </React.Fragment>
    );

    const btnsModalMsj = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" outlined className="p-button-text"  onClick={cerrarModalMsj} />
        </React.Fragment>
    );

    return(
        <div className="datatable-crud-demo">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <DataTable ref={dt} value={funcionario} responsiveLayout="scroll" scrollable >
                                <Column body={checkConfirmacion} exportable={false} style={{ minWidth: '1rem' }}/>
                                <Column field="cedula" header="Cédula" style={{ minWidth: '5rem' }}></Column>
                                <Column field="nombre" header="Nombre" style={{ minWidth: '8rem' }}></Column>
                                <Column field="materias" header="Materias" style={{ minWidth: '8rem' }}></Column>
                                <Column body={btnsColmDercTabla} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
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

            <Dialog visible={verModal} style={{ width: '800px' }} header="Seleccione las secciones a asignar." modal className="p-fluid" footer={btnsModal} onHide={cerrarModal} >
                <div style={{backgroundColor:'white', borderRadius: '15px', paddingTop:'15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                        <div className="container" >
                            <div className="row ">
                                <div className="col-sm ">
                                    <div className="field">
                                        <label
                                            htmlFor={dt.idSec}
                                            style={{ transform: 'translate(10px,7px)' }}>
                                            <b>{"Profesor: "+ funcEdit.nombre}</b>
                                        </label>
                                        <br/>
                                        <label
                                            htmlFor={dt.idSec}
                                            style={{ transform: 'translate(10px,7px)' }}>
                                            <b>{"Materias: "+ funcEdit.materias}</b>
                                        </label>
                                        <br/>
                                        <Divider align="left" ></Divider>

                                        {secciones.map((dt, i) => (
                                            <div key={dt.idSec}>
                                                {(i > 0 && secciones[i-1].grado !== dt.grado) && <Divider align="left" ></Divider>}
                                                <Checkbox 
                                                inputId={dt.idSec} 
                                                name="seccion"
                                                value={dt.idSec}
                                                checked={secEdit.includes(dt.idSec)} 
                                                onChange={guardarSeccion}
                                                />
                                            <label
                                                htmlFor={dt.idSec}
                                                style={{ transform: 'translate(10px,7px)' }}>
                                                <b>{dt.grado+' '+dt.seccion}</b>
                                            </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
           </Dialog>

           <Dialog visible={verModalMsj} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Información" modal footer={btnsModalMsj} onHide={cerrarModalMsj}>
                <div className="confirmation-content">
                    <i className={!icono ? "pi pi-exclamation-triangle mr-3" : "pi pi-check-circle" } style={{ fontSize: '2rem', marginRight: '15px' }} />
                    <span>
                        {mensaje}
                    </span>
                </div>
            </Dialog>

            <Dialog visible={verCargando} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cargando..." modal >
                <Cargando/>
            </Dialog>
        </div>
    );
}