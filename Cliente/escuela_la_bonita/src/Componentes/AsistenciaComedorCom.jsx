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
import { InputNumber } from 'primereact/inputnumber';

export function AsistenciaComedorCom() {

    const [alumnos, setAlumnos] = useState([]);
    const [date, setDate] = useState();


    const toast = useRef(null);
    const dt = useRef(null);

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
                                <br></br>
                                <Calendar
                                    className={"p-inputtext-sm mb-2"}
                                    inputId="calendar"
                                    id="fLista"
                                    value={date} /* verificar por qué no carga a la primera */
                                    dateFormat="dd-mm-yy"
                                    locale="es"
                                    required
                                    onChange={(e) => setDate(e.value.toLocaleDateString('en-ZA'))}
                                    showIcon
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <DataTable ref={dt} value={alumnos} responsiveLayout="scroll">
                                    <Column
                                        field={"Funcionario"}
                                        header="Funcionario"
                                        sortable
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"lunes"}
                                        header="Lunes"
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"martes"}
                                        header="Martes"
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"miercoles"}
                                        header="Miércoles"
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"jueves"}
                                        header="Jueves"
                                        style={{ minWidth: "12rem" }}
                                    ></Column>
                                    <Column
                                        field={"viernes"}
                                        header="Viernes"
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

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}