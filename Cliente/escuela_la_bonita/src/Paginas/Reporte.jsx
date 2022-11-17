import "../style.css";
import "../Estilos.css";
import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import ReactPDF, {PDFViewer,} from "@react-pdf/renderer";
import ConstanciaPDF from "../Componentes/ConstanciaPDF";
import { Obtener_Secciones,ObtenerAusencias, Obtener_Materias,ObtenerAsistenciaIndividual } from "../Persistencia/FuncionarioService";
import { BusquedaCedula } from "../Persistencia/FuncionarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Header } from "../Componentes/Cabecera";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import ReportePDF from "../Componentes/ReportePDF";
import ReportePDFI from "../Componentes/ReporteIndividualPDF"

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

    window.myGlobalSeccion=secciones.grado +" "+ secciones.seccion;

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
        const res = await ObtenerAusencias({FechaIni:FechaInicial.toLocaleDateString("en-CA"), FechaFin:FechaFinal.toLocaleDateString("en-CA"),Grado:secciones.grado,Seccion:secciones.seccion,Materia: materia});
        setDatos(res)
      };

      const ObtenerAsistenciaInd = async () => {
       
        const res = await ObtenerAsistenciaIndividual({FechaIni:FechaInicial.toLocaleDateString("en-CA"), FechaFin:FechaFinal.toLocaleDateString("en-CA"),Identificacion:cedula,Grado:secciones.grado,Seccion:secciones.seccion,Materia: materia});
        console.log("individual ", res)
        setDatos(res)
      };

      const ObtenerEstudiante = async () => {
        const res = await BusquedaCedula(cedula);
        setVerBotonPDFI(true);
        setEstudiante(res);
      };

      const OcultarBTNID = (e)=>{
        console.log("el combo ", e.target.value)
        setTipoReporte(e.target.value);
       
        if(e.target.value==="Individual"){
          
          setVerBotonID(100);
        }else if(e.target.value==="Grupal"){
          setVerBoton(true);
        }
      }


      const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">            
                     <label>{option.grado +' '+ option.seccion}</label>
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
                <label>{option.grado +' '+ option.seccion}</label>
               
            </div>
        );
    }

    console.log("datos trae ", datos)

      return (
        <div>
            {" "}
            <Header />
              <div className="content-select2">
                <label>Seleccione una seccion</label>
                <Dropdown
                    value={secciones}
                    optionLabel= "grado"
                    valueTemplate = {selectedCountryTemplate}
                    itemTemplate = {countryOptionTemplate}
                    options={seccion}
                    
                    onChange={(e)=> setSecciones(e.value)}
                    placeholder="Seleccione el grado"
                />
              </div>

              <div className="content-select3">
                <label>Seleccione una materia</label>
                <Dropdown
                    value={materia}
                    optionLabel= "materia"
                    optionValue="materia"
                    options={materias}
                    
                    onChange={(e)=> setMateria(e.value)}
                    placeholder="Seleccione la materia"
                />
              </div>

              <div className="FechaInicio">
                <label><b>Fecha de inicio:</b></label>
                <br></br>
                <Calendar
                    className="p-inputtext-sm block mb-2"
                    inputId="calendar" id="fInicial"
                    value={FechaInicial}
                    onChange={(e) =>
                        setFechaInicial(e.target.value )}
                    touchUI />           
              </div>

              <div className="FechaFinal">
                <label><b>Fecha final:</b></label>
                <br></br>
                <Calendar
                    className="p-inputtext-sm block mb-2"
                    inputId="calendar" id="fFinal"
                    value={FechaFinal}
                    onChange={(e) =>
                        setFechaFinal(e.target.value )}
                    touchUI />           
              </div>

              <div className="content-select4">
                 <label>Reporte Grupal o Individual:</label>
                    <select
                      value={TipoReporte}
                      name="ReporteGrupaloIndividual"
                      id="ReporteGrupaloIndividual"
                      onChange={OcultarBTNID}
                      
                    >
                    <option value="Elegir">Elija una opcion</option>
                    <option value="Grupal">Reporte Grupal</option>
                    <option value="Individual">Reporte Individual </option>
                </select>
                <i></i>
            </div>


            <div style={{opacity: verBotonID}}>
         
            <label>
              <b>Digite el número de cédula:</b>
            </label>{" "}
            <div
            
              className="p-inputgroup"
              style={{ width: "20%", backgroundPosition: "center", }}
              
            >
              <InputText
               
                style={{ width: "30px" }}
                id="inputtext"
                keyfilter="num"
                className="p-inputtext-sm block mb-2"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
              <Button
                
                icon="pi pi-search"
                id="Buscar2"
                className="p-button-warning"
                onClick={() => {
                  ObtenerEstudiante(); 
                }}
              />
            
            </div>
            
          </div>


            <div className="CargarDatos" >
            <Button className="p-button-warning" visible={verBoton} 
            onClick={() => ObtenerAusencia()}
            onMouseLeave={()=> setVerBotonPDF(true)}
            >
              Cargar Datos
            </Button>
          </div>

          <div className="CargarReportePDF">

            <Button className="p-button-warning" visible={verBotonPDF} onClick={() => setVerPDF(!verPDF)}>
              Generar PDF
            </Button>
          </div>

          <div className="CargarReportePDF">
            <Button className="p-button-warning" visible={verBotonPDFI} onClick={() => {ObtenerAsistenciaInd(); setVerPDFI(!verPDFI);}}>
              Generar PDF
            </Button>
          </div>


          <div style={{ minHeight: "100vh" }}>
            {datos ? (
              <>
                {verPDF ? (
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <ReportePDF dato={datos} />
                  </PDFViewer>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="pdfreporteIndi" style={{ minHeight: "100vh" }}>
            {datos ? (
              <>
                {verPDFI ? (
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <ReportePDFI dato={datos} />
                  </PDFViewer>
                ) : null}
              </>
            ) : null}
          </div>

        </div>
  );
}


