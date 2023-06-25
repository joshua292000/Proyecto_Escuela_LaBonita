import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import { Obtener_Secciones } from "../Persistencia/FuncionarioService";
import { BusquedaCedula } from "../Persistencia/FuncionarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { generarDocumento } from "../Utils/GenerarDocumento";
import{getCurrentDate} from '../Utils/ObtenerFechaActual'
import{ConvertirFechaATexto} from '../Utils/ObtenerFechaActual'
import { Obtener_Persona_Rol } from "../Persistencia/FuncionarioService";

export function ConstanciasCom() {

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

    //const [verBotonPDFM, setVerBotonPDFM] = React.useState(false);

    const [funcionario, setFuncionario] = useState([]);


    useEffect(() => {
        const ObtenerDatosFuncionario = async ()=>{
          const res = await Obtener_Persona_Rol()
          setFuncionario(res)
        }
        ObtenerDatosFuncionario();
  },[]);

    const ObtenerEstudiante = async () => {
        const res = await BusquedaCedula(cedula);

        setEstudiante(res);
    };

    const OcultarBTNID = (e) => {
        setTipoConstancia(e.target.value);

        if (e.target.value === "T") {
            setVerComponentes(100);
            setVerBoton(true);
            setCedula("");
            setCircuito("");
            setEscuela("");
            setEstudiante("");
            setRegional("");
            setVerPDF(false);
            setVerPDFM(false);
        } else if (e.target.value === "E") {
            setVerBoton(true);
            setVerComponentes(0);
            setCedula("");
            setCircuito("");
            setEscuela("");
            setEstudiante("");
            setVerPDFM(false);
            setVerPDF(false);
            
        }
    }

    const TipoPDF = () => {
        if (TipoConstancia === "T") 
        {
            const datos = 
                {
                    nombre: estudiante[0].PNombre +" "+ estudiante[0].SNombre +" "+ estudiante[0].PApellido +" "+ estudiante[0].SApellido,
                    cedula: estudiante[0].Identificacion,
                    año: getCurrentDate(),
                    escuela: escuela ,
                    regional: regional,
                    circuito: circuito,
                    fecha:ConvertirFechaATexto(),
                    directora: funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})
                }
            generarDocumento("TRASLADO.docx", datos, "Constancia de traslado") 

        } else if (TipoConstancia === "E") {
            const datos = 
                {
                    nombre: estudiante[0].PNombre +" "+ estudiante[0].SNombre +" "+ estudiante[0].PApellido +" "+ estudiante[0].SApellido,
                    cedula: estudiante[0].Identificacion,
                    año: getCurrentDate(),
                    fecha:ConvertirFechaATexto(),
                    directora: funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})
                }
            generarDocumento("CONSTANCIAMATRICULA.docx", datos, "Constancia de matricula") 
        }
    }
    const TConstancia = [
        { name: 'Constancia de Traslado', code: 'T' },
        { name: 'Constancia de Estudio', code: 'E' }
    ];


    return (
        <div>
            {" "} 
            <div >

                <div className="container" style={{
                    backgroundColor: 'white',
                    paddingTop: '15px',
                    borderRadius: "15px",
                    border: "15px solid rgb(163, 29, 29, 0.06)",
                }}>
                    <div className="row">
                        <div className="col-sm">
                            <div className="field">
                                <label><b>Tipo de Constancia:</b></label>
                                <div>
                                    <Dropdown
                                        inputId="dropdown"
                                        name="Tipo de Constancia"
                                        id="TipoConstancia"
                                        className="dropdown"
                                        value={TipoConstancia}
                                        options={TConstancia}
                                        placeholder="Elija un tipo de Constancia"
                                        onChange={OcultarBTNID}
                                        optionLabel="name"
                                        optionValue="code"
                                        style={{ width: 'auto' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="CedulaConstancia">
                                <label>
                                    <b>Digite el número de cédula:</b>
                                </label>{" "}
                                <div

                                    className="p-inputgroup"
                                    style={{ width: '70%', backgroundPosition: "center" }}
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
                                            ObtenerEstudiante()
                                           
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <label style={{ fontSize: '20px' }}><b>Nombre completo del estudiante:</b></label>
                            <div className="NombreCompleto">
                                <Button
                                    label={
                                        estudiante ? estudiante.map((est) => {
                                            return est.PNombre + ' ' + est.SNombre + ' ' + est.PApellido + ' ' + est.SApellido
                                        }) : ""}
                                    className="p-button-raised p-button-text"
                                    style={{ color: "black" }} />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ opacity: verComponentes }}>
                        <div className="col-sm">
                            <div className="field">
                                <label><b>Escuela a trasladar:</b></label>{" "}
                                <div className="NombreEscuela">
                                    <InputText
                                        id="Escuela"
                                        className="p-inputtext-sm block mb-2"
                                        value={escuela}
                                        onChange={(e) => setEscuela(e.target.value)}
                                        required
                                        style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="field">
                                <label><b>Regional:</b></label>{" "}
                                <div className="regional">
                                    <InputText
                                        id="Regional"
                                        className="p-inputtext-sm block mb-2"
                                        value={regional}
                                        onChange={(e) => setRegional(e.target.value)}
                                        required
                                        style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="field">
                                <label><b>Circuito:</b></label>{" "}
                                <div className="circuito">
                                    <InputText
                                        id="Circuito"
                                        className="p-inputtext-sm block mb-2"
                                        value={circuito}
                                        onChange={(e) => setCircuito(e.target.value)}
                                        required
                                        style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <Button className="p-button-warning" visible={verBoton} onClick={TipoPDF}>
                                Descargar Constancia
                            </Button>
                        </div>
                    </div>

    
                </div>
            </div>
        </div>
    );
}
