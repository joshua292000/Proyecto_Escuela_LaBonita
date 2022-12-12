import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import ReactPDF, { PDFViewer, } from "@react-pdf/renderer";
import { AsistenciaComedor } from "../Persistencia/FuncionarioService";
import { Button } from "primereact/button";

import { Calendar } from 'primereact/calendar';
import ReporteComedorPDF from "../Componentes/ReporteComedorPDF";

export function ReporteComedorCom() {

    const [FechaInicial, setFechaInicial] = useState("");

    const [FechaFinal, setFechaFinal] = useState("");

    const [datos, setDatos] = useState([]);

    const [verPDF, setVerPDF] = React.useState(false);

    const ObtenerAsiComedor = async () => {
        const res = await AsistenciaComedor({ FechaIni: FechaInicial.toLocaleDateString("en-CA"), FechaFin: FechaFinal.toLocaleDateString("en-CA") });
        setDatos(res)
    };

    window.myGlobalFechaIni = FechaInicial;
    window.myGlobalFechaFin = FechaFinal;

    return (
        <div>
            <div className="comedor" >
                <div className="container" style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                    <div className="row">
                        <div className="col-sm">
                            <div className="FechaInicioComedor">
                                <label><b>Fecha de inicio:</b></label>
                                <div className="calendario">
                                    <Calendar
                                        className=" block mb-2"
                                        inputId="calendar" id="fInicial"
                                        value={FechaInicial}
                                        onChange={(e) =>
                                            setFechaInicial(e.target.value)}
                                        touchUI />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <label><b>Fecha final:</b></label>
                            <div className="FechaFinalComedor">
                                <Calendar
                                    className=" block mb-2"
                                    inputId="calendar" id="fFinal"
                                    value={FechaFinal}
                                    onChange={(e) =>
                                        setFechaFinal(e.target.value)}
                                    touchUI />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="CargarReportePDFComedor">
                                <Button className="p-button-warning" onClick={() => { ObtenerAsiComedor(); setVerPDF(!verPDF) }}>
                                    Generar PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div style={{ minHeight: "100%" }}>
                                {datos ? (
                                    <>
                                        {verPDF ? (
                                            <PDFViewer style={{ width: "100%", height: "200vh" }}>
                                                <ReporteComedorPDF dato={datos} />
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

