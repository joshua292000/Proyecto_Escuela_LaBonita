import "../style.css";
import "../Estilos.css";
import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import ReactPDF, {PDFViewer,} from "@react-pdf/renderer";
import ConstanciaPDF from "../Componentes/ConstanciaPDF";
import { Obtener_Secciones } from "../Persistencia/FuncionarioService";
import { BusquedaCedula } from "../Persistencia/FuncionarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Header } from "../Componentes/Cabecera";
import ConstanciaMatriculaPDF from "../Componentes/ConstanciaMatriculaPDF";


export function Constancias() {
  const cookies = new Cookies();

  const [cedula, setCedula] = useState("");

  const [TipoConstancia, setTipoConstancia] = useState("");

  const [estudiante, setEstudiante] = useState([]);

  const [escuela, setEscuela] = useState([]);

  const [regional, setRegional] = useState([]);
  
  const [circuito, setCircuito] = useState([]);

  const [verPDF, setVerPDF] = React.useState(false);

  const [verComponentes, setVerComponentes] = useState(0);

  const [verBoton, setVerBoton] = React.useState(false);
  
  const [verPDFM, setVerPDFM] = React.useState(false);

  const [verBotonPDFM, setVerBotonPDFM] = React.useState(false);

  window.myGlobalEscuela=escuela;
  window.myGlobalRegional=regional;
  window.myGlobalCircuito=circuito;


  const ObtenerEstudiante = async () => {
    const res = await BusquedaCedula(cedula);
    
    setEstudiante(res);
  };

  const OcultarBTNID = (e)=>{
    console.log("el combo ", e.target.value)
    setTipoConstancia(e.target.value);
   
    if(e.target.value==="Traslado"){
      setVerComponentes(100);
      setVerBoton(true);
    }else if(e.target.value==="Estudio"){
      setVerBotonPDFM(true);
    }
  }

  return (
    <div>
        {" "}
        <Header />
    <div className="container">
      <h1>Constancias</h1>
     <div >
      <div >
          <div className="CedulaConstancia">
            <label>
              <b>Digite el número de cédula:</b>
            </label>{" "}
            <div
            
              className="p-inputgroup"
              style={{ width: "20%", backgroundPosition: "center" }}
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
        </div>
        <div >  
          <div className="NombreCompleto">
            <label>Nombre completo del estudiante: {estudiante ? estudiante.map((est)=>{return est.PNombre+' '+est.SNombre+' '+est.PApellido+' '+est.SApellido}): ""}</label>
          </div>
          
          <div className="content-select">
            <label>Tipo de Constancia:</label>
            <select
              value={TipoConstancia}
              name="Tipo de Constancia"
              id="TipoConstancia"
              onChange={OcultarBTNID}
            >
              <option value="Otra">Elija un tipo de Constancia</option>
              <option value="Traslado">Constancia de Traslado</option>
              <option value="Estudio">Constancia de Estudio</option>
            </select>
            <i></i>
          </div>

          <div className="NombreEscuela" style={{opacity: verComponentes}}>
          <label className="lbl_Escuela">Escuela a trasladar:</label>
           <br/>
              <input
                className="inputE"
                type="text"
                name="Escuela"
                placeholder="Escuela"
                required
                value={escuela}
                onChange={(e) => setEscuela(e.target.value)}
              />
          </div>

          <div className="Regional" style={{opacity: verComponentes}}>
          <label className="lbl_Escuela">Regional:</label>
           <br/>
              <input
                className="inputR"
                type="text"
                name="Regional"
                placeholder="Regional"
                required
                value={regional}
                onChange={(e) => setRegional(e.target.value)}
              />
          </div>

          <div className="Circuito" style={{opacity: verComponentes}}>
          <label className="lbl_Escuela">Circuito:</label>
           <br/>
              <input
                className="inputC"
                type="text"
                name="Circuito"
                placeholder="Circuito"
                required
                value={circuito}
                onChange={(e) => setCircuito(e.target.value)}
              />
          </div>

          <div className="CargarPDF">
            <Button className="p-button-warning" visible={verBoton}  onClick={()  => setVerPDF(!verPDF)}>
              Cargar PDF
            </Button>
          </div>

          <div className="CargarPDF">
            <Button className="p-button-warning" visible={verBotonPDFM}  onClick={()  => setVerPDFM(!verPDFM)}>
              Cargar PDF
            </Button>
          </div>


          <div style={{ minHeight: "100vh" }}>
            {estudiante ? (
              <>
                {verPDF ? (
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <ConstanciaPDF estudiante={estudiante} />
                  </PDFViewer>
                ) : null}
              </>
            ) : null}
          </div>

          <div style={{ minHeight: "100vh" }}>
            {estudiante ? (
              <>
                {verPDFM ? (
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <ConstanciaMatriculaPDF estudiante={estudiante} />
                  </PDFViewer>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
