import "../style.css";
import "../Estilos.css";
import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import ReactPDF, { PDFViewer, } from "@react-pdf/renderer";
import ConstanciaPDF from "../Componentes/ConstanciaPDF";
import { Obtener_Secciones, ObtenerAusencias, Obtener_Materias, ObtenerAsistenciaIndividual } from "../Persistencia/FuncionarioService";
import { BusquedaCedula } from "../Persistencia/FuncionarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Header } from "../Componentes/Cabecera";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import ReportePDF from "../Componentes/ReportePDF";
import ReportePDFI from "../Componentes/ReporteIndividualPDF"
import { Divider } from 'primereact/divider';

export function Reporte() {

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

  window.myGlobalSeccion = secciones.grado + " " + secciones.seccion;

  useEffect(() => {
    const ObtenerDatos = async () => {
      const res = await Obtener_Secciones();
      setSeccion(res);
    };
    const ObtenerMateria = async () => {
      const res = await Obtener_Materias();
      setMaterias(res);
    };

    ObtenerDatos();
    ObtenerMateria();
  }, []);



  const ObtenerAusencia = async () => {
    const res = await ObtenerAusencias({ FechaIni: FechaInicial.toLocaleDateString("en-CA"), FechaFin: FechaFinal.toLocaleDateString("en-CA"), Grado: secciones.grado, Seccion: secciones.seccion, Materia: materia });
    setDatos(res)
    setVerBotonPDF(true)
  };

  const ObtenerAsistenciaInd = async () => {

    const res = await ObtenerAsistenciaIndividual({ FechaIni: FechaInicial.toLocaleDateString("en-CA"), FechaFin: FechaFinal.toLocaleDateString("en-CA"), Identificacion: cedula, Grado: secciones.grado, Seccion: secciones.seccion, Materia: materia });
    console.log("individual ", res)
    setDatos(res)
  };

  const ObtenerEstudiante = async () => {
    const res = await BusquedaCedula(cedula);
    setVerBotonPDF(true);
    setEstudiante(res);
  };

  const OcultarBTNID = (e) => {
    console.log("el combo ", e.target.value)
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

  console.log("datos trae ", datos)

  const tipoReporte = [
    { name: 'Reporte Grupal', code: 'G' },
    { name: 'Reporte Individual', code: 'I' }
  ];

  const TipoPDF = () => {

    if (TipoReporte === "G") {
      setVerPDF(!verPDF)
    } else if (TipoReporte === "I") {
      ObtenerAsistenciaInd()
      setVerPDFI(!verPDFI)
    }
  }
  return (
    <div>
      {" "}
      <Header />
      <div className="p">
        <h1>Reportes</h1>
        <br />
        <div className="container">
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
                  className=" block mb-2"
                  inputId="calendar" id="fInicial"
                  value={FechaInicial}
                  onChange={(e) =>
                    setFechaInicial(e.target.value)}
                  touchUI />
              </div>
            </div>

            <div className="col-sm">
              <div className="FechaFinal">
                <label><b>Fecha final:</b></label>
                <br></br>
                <Calendar
                  className="block mb-2"
                  inputId="calendar" id="fFinal"
                  value={FechaFinal}
                  onChange={(e) =>
                    setFechaFinal(e.target.value)}
                  touchUI />
              </div>
            </div>
          </div>
          <Divider align="left" ></Divider>
          <div className="row">
            <div className="col-sm">
              <label>Reporte Grupal o Individual:</label>
              <div className="content-select4">
                <Dropdown
                  value={TipoReporte}
                  optionLabel="name"
                  optionValue="code"
                  options={tipoReporte}
                  onChange={OcultarBTNID}
                  placeholder="Seleccione la materia"
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
                  style={{height:"7%"}}
                  className="p-button-warning"
                  onClick={() => {
                    ObtenerEstudiante();
                  }}
                />

              </div>
            </div>

            <div className="col-sm">
              <Button className="p-button-warning" visible={verBoton}
                style={{transform:" translateY(29px)"}}
                onClick={() => ObtenerAusencia()}>
                Cargar Datos
              </Button>
            </div>

            <div className="col-sm">
              <Button className="p-button-warning" style={{transform:" translateY(29px)"}} visible={verBotonPDF} onClick={TipoPDF}>
                Generar PDF
              </Button>
            </div>
          </div>
          <Divider align="left" ></Divider>
          <div className="row">
            <div className="col-sm">
              <div style={{ minHeight: "100%" }}>
                {datos ? (
                  <>
                    {verPDF ? (
                      <PDFViewer style={{ width: "100%", height: "200vh" }}>
                        <ReportePDF dato={datos} />
                      </PDFViewer>
                    ) : null}
                    {verPDFI ? (
                      <PDFViewer style={{ width: "100%", height: "200vh" }}>
                        <ReportePDFI dato={datos} />
                      </PDFViewer>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


