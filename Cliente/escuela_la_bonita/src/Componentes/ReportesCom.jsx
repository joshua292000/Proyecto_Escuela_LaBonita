import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import { Obtener_Secciones, ObtenerAusencias, Obtener_Materias, ObtenerAsistenciaIndividual } from "../Persistencia/FuncionarioService";
import { BusquedaCedula } from "../Persistencia/FuncionarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { generarDocumento } from "../Utils/GenerarDocumento";
import{getCurrentDate} from '../Utils/ObtenerFechaActual'
import{ConvertirFechaATexto} from '../Utils/ObtenerFechaActual'
import { Obtener_Persona_Rol } from "../Persistencia/FuncionarioService";

export function ReporteCom() {

    const [seccion, setSeccion] = useState([]);

    const [secciones, setSecciones] = useState([]);

    const [materias, setMaterias] = useState([]);

    const [materia, setMateria] = useState([]);

    const [FechaInicial, setFechaInicial] = useState("");

    const [FechaFinal, setFechaFinal] = useState("");

    const [TipoReporte, setTipoReporte] = useState("");

    const [datos, setDatos] = useState([]);

    const [verPDF, setVerPDF] = React.useState(false);

    const [verPDFI, setVerPDFI] = React.useState(false);

    const [verBoton, setVerBoton] = React.useState(false);

    const [verBotonPDF, setVerBotonPDF] = React.useState(false);

    const [verBotonPDFI, setVerBotonPDFI] = React.useState(false);

    const [verBotonID, setVerBotonID] = useState(0);

    const [cedula, setCedula] = useState("");

    const [estudiante, setEstudiante] = useState([]);

    const [funcionario, setFuncionario] = useState([]);

    window.myGlobalSeccion = secciones.grado + " " + secciones.seccion;

    const cookies = new Cookies();
    const navegar = useNavigate();

    useEffect(() => {
        if(!cookies.get('Func_Id')){
            navegar("/");
      
          }
        const ObtenerDatos = async () => {
            const res = await Obtener_Secciones();
            setSeccion(res);
        };
        const ObtenerMateria = async () => {
            const res = await Obtener_Materias();
            setMaterias(res);
        };

        const ObtenerDatosFuncionario = async ()=>{
            const res = await Obtener_Persona_Rol()
            setFuncionario(res)
          }

        ObtenerDatos();
        ObtenerMateria();
        ObtenerDatosFuncionario();
    }, []);



    const ObtenerAusencia = async () => {
        const res = await ObtenerAusencias({ FechaIni: FechaInicial.toLocaleDateString("en-CA"), FechaFin: FechaFinal.toLocaleDateString("en-CA"), Grado: secciones.grado, Seccion: secciones.seccion, Materia: materia });
        setDatos(res)
        setVerBotonPDF(true)
    };

    const ObtenerAsistenciaInd = async () => {
        const res = await ObtenerAsistenciaIndividual({ FechaIni: FechaInicial.toLocaleDateString("en-CA"), FechaFin: FechaFinal.toLocaleDateString("en-CA"), Identificacion: cedula, Grado: secciones.grado, Seccion: secciones.seccion, Materia: materia });
        setDatos(res)
        setVerBotonPDF(true);
    };

    const ObtenerEstudiante = async () => {
        const res = await BusquedaCedula(cedula);
        setEstudiante(res);
        ObtenerAsistenciaInd();

    };

    const OcultarBTNID = (e) => {
        setTipoReporte(e.target.value);

        if (e.target.value === "I") {
            setVerBotonID(100);
        } else if (e.target.value === "G") {
            setVerBoton(true);
        }
    }

   

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <label>{option.grado + ' ' + option.seccion}</label>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <label>{option.grado + ' ' + option.seccion}</label>

            </div>
        );
    }


    const tipoReporte = [
        { name: 'Reporte Grupal', code: 'G' },
        { name: 'Reporte Individual', code: 'I' }
    ];

    const TipoPDF = () => {
      
        if (TipoReporte === "G") {
            const datosR = 
            {
                año: getCurrentDate(),
                seccion: secciones.grado + " " + secciones.seccion,
                fecha:ConvertirFechaATexto(),
                directora: funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})
            };
            datosR.datos = datos.map((dato) => ({
            cedula: dato.Identificacion,
            nombre: `${dato.PNombre} ${dato.SNombre} ${dato.PApellido} ${dato.SApellido}`,
            presente: dato.Asistencia,
            justificada: dato.Ausencia,
            injustificada: dato.Ausencia_Justificada
            }));

        generarDocumento("REPORTEGRUPAL.docx", datosR, "Reporte de asistencia grupal")

        } else if (TipoReporte === "I") {
            
            console.log("atraso de datos", datos);
            const datosR = 
            {
                año: getCurrentDate(),
                seccion: secciones.grado + " " + secciones.seccion,
                nombre: `${datos[0].PNombre} ${datos[0].SNombre} ${datos[0].PApellido} ${datos[0].SApellido}`,
                cedula: datos[0].Identificacion,
                presente: datos[0].Asistencia,
                justificada: datos[0].Ausencia,
                injustificada: datos[0].Ausencia_Justificada,
                fecha:ConvertirFechaATexto(),
                directora: funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})
            };

        generarDocumento("REPORTEINDIVIDUAL.docx", datosR, "Reporte de asistencia individual")
        }
    }
    return (
        <div>
            {" "}
            <div className="p" >
                <div className="container" style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                    <div className="row">
                        <div className="col-sm">
                            <label><b>Seleccione una sección</b></label>
                            <div className="seccion">
                                <Dropdown
                                    value={secciones}
                                    optionLabel="grado"
                                    valueTemplate={selectedCountryTemplate}
                                    itemTemplate={countryOptionTemplate}
                                    options={seccion}
                                    onChange={(e) => setSecciones(e.value)}
                                    placeholder="Seleccione una sección"
                                />
                            </div>
                        </div>

                        <div className="col-sm">
                            <label><b>Seleccione una materia</b></label>
                            <div className="content">
                                <Dropdown
                                    value={materia}
                                    optionLabel="materia"
                                    optionValue="materia"
                                    options={materias}

                                    onChange={(e) => setMateria(e.value)}
                                    placeholder="Seleccione la materia"
                                />
                            </div>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                    <div className="row">
                        <div className="col-sm">
                            <label><b>Fecha de inicio:</b></label>
                            <div className="FechaInicio">
                                <Calendar
                                    //className=" block mb-2"
                                    inputId="calendar" 
                                    id="fInicial"
                                    value={FechaInicial}
                                    onChange={(e) =>
                                        setFechaInicial(e.target.value)}
                                    showIcon 
                                    touchUI
                                    />
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="FechaFinal">
                                <label><b>Fecha final:</b></label>
                                <br></br>
                                <Calendar
                                    //className="block mb-2"
                                    inputId="calendar" id="fFinal"
                                    value={FechaFinal}
                                    onChange={(e) =>
                                        setFechaFinal(e.target.value)}
                                    showIcon
                                    touchUI />
                            </div>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                    <div className="row">
                        <div className="col-sm">
                            <label><b>Reporte Grupal o Individual:</b></label>
                            <div className="content-select4">
                                <Dropdown
                                    value={TipoReporte}
                                    optionLabel="name"
                                    optionValue="code"
                                    options={tipoReporte}
                                    onChange={OcultarBTNID}
                                    placeholder="Seleccione el reporte"
                                />
                            </div>
                        </div>
                        <div className="col-sm" style={{ opacity: verBotonID }}>
                            <label><b>Digite el número de cédula:</b></label>
                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: "center" }}>
                                <InputText
                                    id="inputtext" 
                                    keyfilter="num"
                                    className=" block mb-2"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    required
                                />
                                <Button
                                    icon="pi pi-search"
                                    id="Buscar2"
                                    style={{ height: "7%" }}
                                    className="p-button-warning"
                                    onClick={() => {
                                        ObtenerEstudiante();
                                    }}
                                />

                            </div>
                        </div>

                        <div className="col-sm">
                            <Button className="p-button-sm p-button-warning" visible={verBoton}
                                style={{ transform: " translateY(29px)" }}
                                onClick={() => ObtenerAusencia()}>
                                Cargar Datos
                            </Button>
                        </div>

                        <div className="col-sm">
                            <Button className="p-button-warning p-button-sm" style={{ transform: " translateY(29px)" }} visible={verBotonPDF} onClick={TipoPDF}>
                                Generar Reporte
                            </Button>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                </div>

            </div>
        </div>
    );
}


