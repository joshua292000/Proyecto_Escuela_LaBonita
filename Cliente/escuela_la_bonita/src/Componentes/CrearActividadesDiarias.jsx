import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect , useContext, useRef } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Obtener_Actividades_Diarias } from "../Persistencia/EncargadoService";
import { format } from 'date-fns';
import { CrearActividad } from '../Persistencia/FuncionarioService';
import { EliminarActividad } from '../Persistencia/FuncionarioService';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


let datosVacios = {
    title: "", description: "", start: "", end: ""
};

export function CrearActividadesDiarias() {
    const [actividadEdit, setactividadEdit] = useState(datosVacios);//contendrá la información del sustento legal
    const [verModal, setVerModal] = useState(false);//control booleano de la pantalla modal. true se muestra, false se oculta
    const [requerido, setRequerido] = useState(false);
    const [borrarAct, setborrarAct] = useState(false);
    const [fecha, setFecha] = useState('');
    const [tablaData, setTablaData] = useState([]);
    const cookies = new Cookies();
    const navegar = useNavigate();
    
    const msjEmergente = useRef(null);

    useEffect(() => {

        if(!cookies.get('Func_Id')){
            navegar("/");
      
          }

        const ObtenerDatos = async ()=>{
          const res = await Obtener_Actividades_Diarias()
          setTablaData(res)
          setFecha(new Date(res.start));
               
        }
        ObtenerDatos(); 
        
  },[]);

    const crearNuevo = () => {
        setactividadEdit(datosVacios);
        setVerModal(true);
        setRequerido(false);
    }

    const cerrarModal = () => {
        setVerModal(false);
        setRequerido(false);
    }

    const guardarActividad = () => {
        setRequerido(true);
        
        if (actividadEdit.title.trim()) {
            let datos = [...tablaData];
            const editados = { ...actividadEdit };

            
           

            if (actividadEdit.title) {
                const elementoEditado = datos.find((elemento) => elemento.title === actividadEdit.title);
                

                if (elementoEditado) {
                    elementoEditado.title = actividadEdit.title;
                    msjEmergente.current.show({ severity: 'success', summary: 'Actualización', detail: 'Actividad actualizada', life: 2500 });
                     
                    editados.start = fecha.start.toLocaleDateString("en-CA");
                    editados.end = fecha.end.toLocaleDateString("en-CA");
                    CrearActividad(editados);
                    setTablaData(datos);
                    
                } else {
                    
                    editados.start = fecha.start.toLocaleDateString("en-CA");
                    editados.end = fecha.end.toLocaleDateString("en-CA");
                    datos.push(editados);
                    msjEmergente.current.show({ severity: 'success', summary: 'Registrado', detail: 'Actividad Registrada', life: 2500 });
                    setTablaData(datos);
                    console.log("datos a guardar", editados)
                    CrearActividad(editados);
                     
                }

            } else {
                msjEmergente.current.show({ style:{backgroundColor: 'white'}, severity: 'feiled', summary: 'Se produjo un problema', detail: 'Actividad NO Registrada', life: 2500 });
            }
            setVerModal(false);
            setactividadEdit(datosVacios);
        }
    }

    const buscarXnombre = (cd) => {
        let index = -1;
        for (let i = 0; i < tablaData.length; i++) {
            if (tablaData[i].title === cd) {
                index = i;
                break;
            }
        }

        return index;
    }


    const editarActividad = (data) => {
        setactividadEdit({ ...data });
        setVerModal(true);
        setFecha({start: new Date(data.start), end: new Date(data.end) });
    }

    const confirmarborrarAction = (data) => {
        setborrarAct(true);
        setactividadEdit({ ...data });
 
    }
    const cerrarModalBorrar = () => {
        setborrarAct(false);
    }

    const borrarAction = async () => {
        if (actividadEdit.title.trim()) {
            const nuevosDatos = tablaData.filter((elemento) => elemento.title !== actividadEdit.title);
            if (actividadEdit.title) {
                console.log("Se va a eliminar: ",actividadEdit.title );
                EliminarActividad(actividadEdit.title);
                msjEmergente.current.show({ severity: 'success', summary: 'Confirmación', detail: 'Actividad borrada correctamente', life: 3000 });
            }else {
                msjEmergente.current.show({ severity: 'feiled', summary: 'Se produjo un problema', detail: 'Actividad NO eliminada', life: 3000 });
            }
            setTablaData(nuevosDatos);
            setactividadEdit(datosVacios);
            setborrarAct(false);
                 
        }
         
    }

    const datosDeEntrada = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...actividadEdit };
        _product[`${name}`] = val;

        setactividadEdit(_product);
    }
    
    const formatoFecha = (fecha) => {
        const date = new Date(fecha);
        return format(date, 'dd/MM/yyyy');
    };

    // btns de editar y eliminar de la columna derecha de la tabla
    const btnsColmDercTabla = (rowData) => {
        return (
            <React.Fragment>
                {/*boton de editar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 " onClick={() => { editarActividad(rowData) }}/>
                {/*boton de eliminar de la columna de la derecha, ubicado en la tabla */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={()=> { confirmarborrarAction(rowData) }} />
            </React.Fragment>
        );
    }

    const btnAgregarEncIzquierdo = () => {
        return (
            <React.Fragment>
                <Button label="Agregar actividad" icon="pi pi-plus" className="p-button-success mr-2" onClick={crearNuevo} />
            </React.Fragment>
        )
    }

    const btnsModal = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={cerrarModal} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={guardarActividad} />
        </React.Fragment>
    );

    const btnsModalBorrar = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={cerrarModalBorrar} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={borrarAction} />
        </React.Fragment>
    );


    return (
        <div>
        {" "} 
        <div >
                <div className="datatable-crud-demo">
                    <Toast ref={msjEmergente}/>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <Toolbar className="mb-4" left={btnAgregarEncIzquierdo}></Toolbar>
                                    <DataTable value={tablaData} responsiveLayout="scroll" >
                                        <Column field="title" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
                                        <Column field="description" header="Descripción" sortable style={{ minWidth: '20rem' }}></Column>
                                        <Column field="start" header="Fecha de Inicio" sortable style={{ minWidth: '12rem' }}></Column>
                                        <Column field="end" header="Fecha Final" sortable style={{ minWidth: '12rem' }}></Column>
                                        <Column body={btnsColmDercTabla} exportable={false} style={{ minWidth: '10rem' }}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dialog visible={borrarAct} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={btnsModalBorrar} onHide={cerrarModalBorrar}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {actividadEdit && (
                        <span>
                            Estas seguro que quieres eliminar la actividad: <b>{actividadEdit.title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
                    <Dialog visible={verModal} style={{ width: '800px' }} header="Datos de la actividad" modal className="p-fluid" footer={btnsModal} onHide={cerrarModal} >
                        <div className="form-demo" style={{ height: 'auto' }}>                          
                            <br />
                            <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                                <div className="row ">
                                    <div className="col-sm offset-md-3">
                                        <div className="field">
                                            <label><b>Nombre:</b></label>{" "}
                                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                                <InputText                                                  
                                                    style={{ width: '30px' }}
                                                    id="title"
                                                    value={actividadEdit.title}
                                                    onChange={(e) =>
                                                        datosDeEntrada(e, 'title')}
                                                    required />                                              
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>  
                                <div className="row ">  
                                    <div className="col-sm  offset-md-3">
                                        <div className="field">
                                        <label><b>Descripción:</b></label>{" "}
                                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                                <InputTextarea                                                  
                                                    id="description"  
                                                    className= { requerido && !actividadEdit.description  ? 'p-invalid'  : "p-inputtext-sm mb-2"}   // "p-inputtext-sm mb-2"
                                                    value={actividadEdit.description}   
                                                    onChange={(e) =>
                                                        datosDeEntrada(e, 'description')}
                                                    required 
                                                    style={{ transform: 'translateX(1px)', width: '98%' }} />
                                                    {requerido && !actividadEdit.description && <small className="p-error">Descripción es requerido</small>}            
                                            </div>
                                        </div>
                                    </div>           
                                </div>

                                <div className="row "> 
                                    <div className="col-sm offset-md-3">
                                        <div className="field">
                                            <label><b>Fecha de Inicio:</b></label>{" "}
                                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                                <Calendar                                                  
                                                    style={{ width: '30px' }}
                                                    id="fInicial"
                                                    dateFormat="dd-mm-yy"               
                                                    value={fecha.start}
                                                    locale="es"
                                                    required
                                                    onChange={(e) =>{
                                                        datosDeEntrada(e.value.toLocaleDateString('en-ZA'))
                                                        setFecha({...fecha, start: new Date(e.value)})}}
                                                    showIcon              
                                                    touchUI
                                                     />                                              
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>  

                                <div className="row ">
                                    <div className="col-sm offset-md-3">
                                        <div className="field">
                                            <label><b>Fecha final:</b></label>{" "}
                                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                                <Calendar                                                  
                                                    style={{ width: '30px' }}
                                                    id="fFinal"
                                                    dateFormat="dd-mm-yy"               
                                                    value={fecha.end}
                                                    locale="es"
                                                    required
                                                    onChange={(e) =>{
                                                        datosDeEntrada(e.value.toLocaleDateString('en-ZA'))
                                                        setFecha({...fecha, end: new Date(e.value)})}}
                                                    showIcon              
                                                    touchUI
                                                     />                                              
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>  


                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );

}