import React, { useState, useEffect, useRef } from "react";
import { obtenerAlumnos, Obtener_Materias, Obtener_Secciones, insertarAsistencia } from "../Persistencia/FuncionarioService";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

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
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);



    useEffect(() => {
        const obtenerDatos = async () => {
            const res = await Obtener_Materias();
            const res1 = await Obtener_Secciones();
            //console.log("res:", res);

            setMateria(res);
            setSeccion(res1);
        }
        obtenerDatos()
    }, [])

    const obtenerA = async () => {
        console.log(seccionS);
        const res2 = await obtenerAlumnos(seccionS);
        //console.log("res2:",res2)
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
            if (data.cedula) {
                const index = findIndexById(data.cedula);
                if (props.justi != null) {
                    alum[index].asistencia = "Ausencia justificada";
                    alum[index].justificacion = jus;
                    setProductDialog(false);
                }
                if (props.estado != null) {
                    alum[index].asistencia = props.estado;
                }
                alum[index].materia = materiaS;
                console.log("date:", date);
                alum[index].fechaA = date;
                toast.current.show({ severity: "success", summary: "Actualización", detail: "Encargado actualizado", life: 3000, });
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
                    value="true"
                    id="Presente"
                    name="asistenciaest"
                    onClick={async () => {
                        await guardarCambios(rowData, { estado: "Presente", justi: null })
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
                    value="true"
                    id="Ausente"
                    name="asistenciaest"
                    onClick={async () => {
                        await guardarCambios(rowData, { estado: "Ausencia injustificada", justi: null })
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
                    value="true"
                    id="AusenciaJusti"
                    name="asistenciaest"
                    onClick={() => {
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
                    value={rowData.justificacion}
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
                                    dateFormat="yy-mm-dd"
                                    onChange={(e) => setDate(e.value)}
                                    showIcon

                                />
                                {"  "}
                            </div>
                            <div className="col">
                                <label><b>Seccion:</b></label>
                                <div>
                                    <Dropdown
                                        name="label"
                                        value={seccionS}
                                        optionLabel="grado"
                                        className="p-inputtext-sm block mb-2"
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
                                        className="p-inputtext-sm block mb-2"
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
                                        header="Cedula"
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