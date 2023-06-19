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
import moment from "moment";

export function Asistenciacom() {
    const [materia, setMateria] = useState([]);
    const [materiaS, setMateriaS] = useState();
    const [seccion, setSeccion] = useState([]);
    const [seccionS, setSeccionS] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [edit, setEdit] = useState();
    const [jus, setJus] = useState({});
    const [date, setDate] = useState(null);
    const [Fechahoy] = useState(new Date());
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);



    useEffect(() => {
        const obtenerDatos = async () => {
            //se obtienen las materias y secciones según el funcionario
            const res = await Obtener_Materias();
            const res1 = await Obtener_Secciones();
            //console.log("res:", res);

            setMateria(res);
            setSeccion(res1);
        }
        obtenerDatos()
    }, [])
    
    const obtenerA = async () => {
        console.log("seccion", seccionS.seccion);
        console.log("grado", seccionS.grado);
        const formattedDate = moment(date).format("YYYY-MM-DD");    
        const res2 = await obtenerAsistencia({ materia: materiaS, seccion: seccionS.seccion, grado: seccionS.grado, fechaA: formattedDate });
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
                <label>{option.grado + " " + option.seccion}</label>
            </div>
        );
    };


    const guardarCambios = (datos, props) => {
        setSubmitted(true);
        if (datos.cedula.trim()) {
            let alum = [...alumnos];
            let data = { ...datos };
            console.log("Objeto", alum)
            if (data.cedula) {
                const index = findIndexById(data.cedula);
                if (props.justi != null) {
                    alum[index].asistencia = "Ausencia justificada";
                    alum[index].justificacion = jus;
                    setProductDialog(false);
                }
                if (props.tasistencia != null) {
                    alum[index].asistencia = props.tasistencia;
                }
                alum[index].materia = materiaS;
                console.log("date:", date);
                alum[index].fechaA = date;
                toast.current.show({ severity: "success", summary: "Actualización", detail: "Asistencia Actualizada", life: 3000, });
            }
            setAlumnos(alum);
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
                <input
                    type="radio"
                    value="Presente"
                    checked={rowData.tasistencia=="Presente"}
                    id="Presente"
                    name={rowData.cedula}
                    onChange={async () => {
                        await guardarCambios(rowData, { tasistencia: "Presente", justi: null })
                    }}
                ></input>
            </React.Fragment>
        );
    }


    const buttonAusenInjus = (rowData) => {
        return (
            <React.Fragment>
                <input
                    type="radio"
                    value="Ausencia injustificada"
                    checked={rowData.tasistencia=="Ausencia injustificada"}
                    id="Ausente"
                    name={rowData.cedula}
                    onChange={async () => {
                        await guardarCambios(rowData, { tasistencia: "Ausencia injustificada", justi: null })
                    }}
                ></input>
            </React.Fragment>
        );
    }

    const buttonAusenJusti = (rowData) => {
        return (
            <React.Fragment>
                <input
                    type="radio"
                    value="Ausencia justificada"
                    checked={rowData.tasistencia=="Ausencia justificada"}
                    id="AusenciaJusti"
                    name={rowData.cedula}
                    onChange={() => {
                        setEdit(rowData);
                        setProductDialog(true);
                    }}

                ></input>
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
                await guardarCambios(edit, { estado: null, justi: "" })
            }} />
        </React.Fragment>)

    console.log("edit", alumnos);
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
                                <label className="Usuario"><b>Nombre de usuario</b></label>
                            </div>
                            <div className="col">
                                <label><b>Fecha:</b></label>
                                <Calendar
                                    id="icon"
                                    value={date}
                                    dateFormat="dd-mm-yy" 
                                    onChange={(e) => setDate(e.value.toLocaleDateString("zh-Hans-CN"))}
                                    showIcon
                                />
                                {"  "}
                            </div>
                            <div className="col">
                                <label><b>Sección:</b></label>
                                <div>
                                    <Dropdown
                                        name="label"
                                        value={seccionS}
                                        optionLabel="grado"
                                        className="dropdown"
                                        valueTemplate={selectedSeccionesTemplate}
                                        itemTemplate={seccionOptionTemplate}
                                        options={seccion}
                                        onChange={(e) => setSeccionS(e.value)}
                                        placeholder="Seleccione el grado"
                                        style={{ width: 'auto' }}
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
                                        className="dropdown"
                                        options={materia}
                                        onChange={(e) => setMateriaS(e.value)}
                                        placeholder="Selecione la materia"
                                        style={{ width: 'auto' }}
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
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <DataTable ref={dt} value={alumnos} responsiveLayout="scroll">
                                    <Column
                                        field={"cedula"}
                                        header="Cédula"
                                        sortable
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"pnombre"}
                                        header="Nombre"
                                        sortable
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        header="Presente"
                                        body={buttonPresente}
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        header="Ausencia injustificada"
                                        body={buttonAusenInjus}
                                        exportable={false}
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        header="Ausencia justificada"
                                        body={buttonAusenJusti}
                                        exportable={false}
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        header="Motivo de la ausencia"
                                        body={inputJustificacion}
                                        exportable={false}
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
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
                                    onClick={() => {
                                        alumnos.map(async (dt) => {
                                            await insertarAsistencia(dt);
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    <Toast ref={toast} />


                    <Dialog
                        visible={productDialog}
                        style={{ width: "800px" }}
                        header="Justificación"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
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
                                            onChange={(e) => {
                                                setJus(e.target.value);
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