import "../style.css";
import "../Estilos.css";
import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import ReactPDF, {PDFViewer,} from "@react-pdf/renderer";
import { AsistenciaComedor } from "../Persistencia/FuncionarioService";
import { Button } from "primereact/button";
import { Header } from "../Componentes/Cabecera";
import { Calendar } from 'primereact/calendar';
import ReporteComedorPDF from "../Componentes/ReporteComedorPDF";


export function ReporteComedor() {

    const [FechaInicial, setFechaInicial] = useState("");

    const [FechaFinal, setFechaFinal] = useState("");

    const [datos, setDatos] = useState([]);

    const [verPDF, setVerPDF] = React.useState(false);

      const ObtenerAsiComedor = async () => {
        const res = await AsistenciaComedor({FechaIni:FechaInicial.toLocaleDateString("en-CA"), FechaFin:FechaFinal.toLocaleDateString("en-CA")});
        setDatos(res)
      };

      window.myGlobalFechaIni=FechaInicial;
      window.myGlobalFechaFin=FechaFinal;

      return (
        <div>
            {" "}
            <Header />

              <div className="FechaInicioComedor">
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

              <div className="FechaFinalComedor">
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
           

          <div className="CargarReportePDFComedor">

            <Button className="p-button-warning"  onClick={() => {ObtenerAsiComedor(); setVerPDF(!verPDF)}}>
              Generar PDF
            </Button>
          </div>
            <br></br>            

          <div style={{ minHeight: "100vh" }}>
            {datos ? (
              <>
                {verPDF ? (
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <ReporteComedorPDF dato={datos} />
                  </PDFViewer>
                ) : null}
              </>
            ) : null}
          </div>

  

        </div>
  );
}

