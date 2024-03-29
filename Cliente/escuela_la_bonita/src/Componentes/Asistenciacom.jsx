import React, { useState, useEffect, useRef } from "react";
import { obtenerAsistencia, Obtener_Materias, Obtener_Secciones, insertarAsistencia, obtenerAlumnos } from "../Persistencia/FuncionarioService";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { RadioButton } from 'primereact/radiobutton';
import { addLocale } from 'primereact/api';
import moment from "moment";
import { auto } from "@popperjs/core";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export function Asistenciacom() {
    const datosVacios = {justificacion: ""};
    const [materia, setMateria] = useState([]);
    const [materiaS, setMateriaS] = useState();
    const [seccion, setSeccion] = useState([]);
    const [seccionSelec, setSeccionSelec] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [edit, setEdit] = useState({});
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fecha, setFecha] = useState();
    const [date, setDate] = useState();
    

    const toast = useRef(null);
    const dt = useRef(null);

    const navegar = useNavigate();
    const cookies = new Cookies();

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

    

    useEffect(() => {
        //valida si esta logeado
        if(!cookies.get('Func_Id')){
            navegar("/");
        }else{
            const obtenerDatos = async () => {
                //se obtienen las materias y secciones según el funcionario
                const res = await Obtener_Materias();
                const res1 = await Obtener_Secciones();
                //console.log("res:", res);
    
    
                setMateria(res);
                setSeccion(res1);
            }
            obtenerDatos()
        }
        
    }, [])
    
    const obtenerA = async () => {
        console.log("seccion", seccionSelec.seccion);
        console.log("grado", seccionSelec.grado);
        const formattedDate = moment(date).format("YYYY-MM-DD");    
        const res2 = await obtenerAsistencia({ materia: materiaS, seccion: seccionSelec.seccion, grado: seccionSelec.grado, fechaA: formattedDate });
        //console.log("fechahoy",datehoy)
        console.log("materia", materiaS)
        console.log("res2:", res2)
        console.log("fecha", formattedDate);
        setAlumnos(res2);
        setLoading1(true);
        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    };

    console.log("ALUMNOS", alumnos)
    console.log("FECHA", date)
    console.log("seccion", seccionSelec.seccion);
    console.log("grado", seccionSelec.grado);


    const selectedSeccionesTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <label>{option.grado + " " + option.seccion}</label>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const seccionOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <span>{option.grado + " " + option.seccion}</span>
            </div>
        );
    };


    const guardarCambios = (rowData, props) => {
        setSubmitted(true);
        if (rowData.cedula.trim()) {
            let alum = [...alumnos];
            let data = { ...rowData };
            console.log("Objeto", data)           
            const index = findIndexById(data.cedula);
            if (props.justi != null) {
                alum[index].tasistencia = "Ausencia justificada";
                alum[index].justificacion = data.justificacion;
                setProductDialog(false);
            }
            if (props.tasistencia != null) {
                alum[index].tasistencia = props.tasistencia;
            }
            alum[index].materia = materiaS;
            console.log("date:", date);
            alum[index].fechaA = date;
            toast.current.show({ severity: "success", summary: "Actualización", detail: "Asistencia Actualizada", life: 1000, });
            setAlumnos(alum);
            //setEdit({});
        }
        
    }
    const findIndexById = (cd) => {
        let index = -1;
        for (let i = 0; i < alumnos.length; i++) {
            if (alumnos[i].cedula === cd) {
                index = i;
                break;
            }
        }

        return index;
    }
    const buttonPresente = (rowData) => {
        return (
            <React.Fragment>
                <RadioButton
                    inputId="lista"
                    value="Presente"
                    checked={rowData.tasistencia=="Presente"}
                    id="Presente"
                    name={rowData.cedula}
                    onChange={() => {
                        setEdit(rowData);
                        guardarCambios(rowData, { tasistencia: "Presente", justi: null })
                    }}
                ></RadioButton>
            </React.Fragment>
        );
    }



    const buttonAusenInjus = (rowData) => {
        return (
            <React.Fragment>
                <RadioButton
                    inputId="lista"
                    value="Ausencia injustificada"
                    checked={rowData.tasistencia=="Ausencia injustificada"}
                    id="Ausente"
                    name={rowData.cedula}
                    onChange={() => {
                        setEdit(rowData);
                        guardarCambios(rowData, { tasistencia: "Ausencia injustificada", justi: null })
                    }}
                ></RadioButton>
            </React.Fragment>
        );
    }

    const buttonAusenJusti = (rowData) => {
        return (
            <React.Fragment>
                <RadioButton
                    inputId="lista"
                    value="Ausencia justificada"
                    checked={rowData.tasistencia=="Ausencia justificada"}
                    id="AusenciaJusti"
                    name={rowData.cedula}
                    onChange={() => {
                        setEdit(rowData);
                        setProductDialog(true);
                    }}

                ></RadioButton>
            </React.Fragment>
        );
    }


    const inputJustificacion = (rowData) => {
        return (
            <React.Fragment>
                <InputText
                    id="inputtext"
                    className="p-inputtext-sm block mb-2"
                    value={rowData.tasistencia === "Ausencia justificada" ? rowData.justificacion : ''}
                    style={{ width: '90%' }}
                    onClick={()=>{
                        if(rowData.tasistencia === "Ausencia justificada"){
                            setEdit(rowData);
                            setProductDialog(true);
                        }
                        }}
                    required />
            </React.Fragment>
        );
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={async () => {
                guardarCambios(edit, { tasistencia: null, justi: "" })
            }} />
        </React.Fragment>)

    console.log("edit", edit);
    //console.log("materia", materiaS);


    return (
        <div>
            {" "}
            <div>
                {" "}
                <div>
                </div>
                <div  >
                    <div className="container" style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                        <div className="row">
                            <div className="col">
                                <label><b>Fecha:</b></label>
                                <Calendar
                                    className={"p-inputtext-sm mb-2"}
                                    inputId="calendar"
                                     id="fLista"
                                    value={fecha} /* verificar por qué no carga a la primera */
                                    dateFormat="dd-mm-yy" 
                                    locale="es" 
                                    required
                                    onChange={(e) => {
                                        setDate(e.value.toLocaleDateString('en-ZA'));
                                        setFecha(new Date(e.value));
                                    }}
                                    showIcon
                                />
                                {"  "}
                            </div>
                            <div className="col">
                                <label><b>Sección:</b></label>
                                <div>
                                    <Dropdown
                                        value={seccionSelec}
                                        optionLabel="grado"
                                        className="p-inputtext-sm mb-2"
                                        valueTemplate={selectedSeccionesTemplate}
                                        itemTemplate={seccionOptionTemplate}
                                        options={seccion}
                                        onChange={(e) => setSeccionSelec(e.value)}
                                        placeholder="Seleccione el grado"
                                        style={{ width: auto, height:'50%' }}
                                    />
                                </div>

                            </div>
                            <div className="col">
                                <label><b>Materia:</b></label>
                                <div>
                                    <Dropdown
                                        value={materiaS}
                                        optionLabel="materia"
                                        optionValue="materia"
                                        className="p-inputtext-sm mb-2"
                                        options={materia}
                                        onChange={(e) => setMateriaS(e.value)}
                                        placeholder="Selecione la materia"
                                        style={{ width: auto, height:'50px' }}
                                    />
                                </div>

                                {"  "}
                            </div>
                            <div className="col">
                               
                                <Button
                                    style={{ transform: 'translateY(30%)' }}
                                    label="Cargar lista"
                                    className="p-button-sm p-button-warning "
                                    icon="pi pi-check"
                                    loading={loading1}
                                    onClick={obtenerA}
                                    disabled = {date && seccionSelec.grado && materiaS ? false: true}
                                    
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <DataTable ref={dt} value={alumnos} responsiveLayout="scroll" scrollable emptyMessage = "No hay datos para mostar. Cargue la lista">
                                    <Column field={"cedula"} header="Cédula" sortable style={{ minWidth: "10rem" }} />
                                    <Column field={(dt)=>{return dt.pnombre +" "+ dt.papellido}} header="Nombre" sortable style={{ minWidth: "12rem" }} />
                                    <Column header="Presente" body={buttonPresente} style={{ minWidth: "10rem" }} />
                                    <Column header="Ausencia injustificada" body={buttonAusenInjus} exportable={false} style={{ minWidth: "10rem" }}/>
                                    <Column header="Ausencia justificada" body={buttonAusenJusti} exportable={false} style={{ minWidth: "10rem" }} />
                                    <Column header="Motivo de la ausencia" body={inputJustificacion} exportable={false} style={{ minWidth: "10rem" }} />
                                </DataTable>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Button
                                    label="Guardar"
                                    id="cargarlista"
                                    className="p-button-sm"
                                    icon="pi pi-save"
                                    disabled = {alumnos.length > 0 ? false: true}
                                    onClick={() => {
                                        alumnos.map(async (dt) => {
                                            await insertarAsistencia(dt);
                                            window.location.reload()
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    <Toast ref={toast} />


                    <Dialog visible={productDialog}style={{ width: "800px" }} header="Justificación" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="form-demo" style={{ height: "auto" }}>
                            <div className=" col-sm">
                                <div className="field">
                                    <label>
                                        <b>Justificación:</b>
                                    </label>{" "}
                                    <div>
                                        <InputText
                                            id="inputtext"
                                            className="p-inputtext-sm block mb-2"
                                            value={edit.justificacion}
                                            onChange={(e) => {
                                                setEdit({...edit, justificacion: e.target.value});
                                            }}
                                            style={{ width: "90%" }}
                                        />
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