import { useContext, useState } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { Matricula } from "../Persistencia/MatriculaService";
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { InfoEncargado } from "../Componentes/InforPersEnc";
import { Divider } from "primereact/divider";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { ButtonSiguiente } from "../Componentes/Utils";

export function InfoEstudianteCom() {
    const [state, setState] = useContext(infoEstudiante);
    const [date, setDate] = useState(null);
    const grados = [
        { name: "Primero" },
        { name: "Segundo" },
        { name: "Tercero" },
        { name: "Cuarto" },
        { name: "Quinto" },
        { name: "Sexto" },
    ];
    const adecuaciones = [
        { name: "No tiene" },
        { name: "No significativa" },
        { name: "Significativa" },
        { name: "De acceso" },
    ];
    const VerPers = () => {

        console.log("ver id", state.viaja)
        if (state.viaja === "A") {
            return (

                <div >
                    <Divider align="left"></Divider>
                    <label className="viaja">
                        <b>Nombre de las personas que lo pueden acompañar:</b>
                    </label>
                    <InfoEncargado />
                </div>
            )
        }
    }
    return (
        <div>
            {" "}
            <div >
                <div
                    className="container"
                    style={{
                        backgroundColor: 'white',
                        paddingTop: '15px',
                        borderRadius: "15px",
                        border: "15px solid rgb(163, 29, 29, 0.06)",
                    }}
                >
                    <div className="row ">
                        <div className="col-sm">
                            <div className="field">
                                <label>
                                    <b>Grado:</b>
                                </label>
                                <br></br>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Grado"
                                    id="Grado"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.grado}
                                    options={grados}
                                    placeholder="Grado"
                                    onChange={(e) => setState({ ...state, grado: e.target.value })}
                                    optionLabel="name"
                                    optionValue="name"
                                    style={{ width: "auto" }}
                                />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="field">
                                <label>
                                    <b>Adecuación</b>
                                </label>
                                <br></br>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Adecuación"
                                    id="Adecuación"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.adecuacion}
                                    options={adecuaciones}
                                    placeholder="Adecuación"
                                    onChange={(e) =>
                                        setState({ ...state, adecuacion: e.target.value })
                                    }
                                    optionLabel="name"
                                    optionValue="name"
                                    style={{ width: "auto" }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="field">
                                <label for="descripcionAdecuacion">
                                    <b>Descripción de adecuación:</b>
                                </label>
                                <br></br>
                                <InputTextarea
                                    type="text"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.descripcion}
                                    autoResize
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            descripcion: e.target.value,
                                        })
                                    }
                                    rows={5}
                                    style={{ transform: 'translateX(5px)', width: '98%' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Divider align="left"></Divider>
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="viaja">
                                <b>Viaja:</b>
                            </label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-auto col-sm-5">
                            <RadioButton
                                inputId="viaja"
                                value="true"
                                checked={state.viaja === "S"}
                                id="solo"
                                name="viaja"
                                onChange={(e) => setState({ ...state, viaja: "S" })}
                            />
                            <label htmlFor="viaja" style={{ transform: "translate(10px,7px)" }}>
                                <b>Solo</b>
                            </label>
                        </div>
                        <div className="col-sm-auto">
                            <RadioButton
                                inputId="viaja2"
                                value="true"
                                checked={state.viaja === "A"}
                                id="acompañado"
                                name="viaja"
                                onChange={(e) => setState({ ...state, viaja: "A" })}
                            />
                            <label
                                htmlFor="viaja2"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>Acompañado</b>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col">
               <VerPers></VerPers>
  
              </div>*/}
                        <div className=" col-sm-8">
                            <label className="viaja">
                                <b>Nombre de las personas que lo pueden acompañar:</b>
                            </label>
                            <div className="field">
                                <InputText
                                    type="text"
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            pApellido: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Divider align="left"></Divider>
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="sexo">
                                <b>Posee póliza estudiantil:</b>
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <label className="sexo">
                                <b>Fecha de vencimiento:</b>
                            </label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2">
                            <RadioButton
                                inputId="poliza1"
                                value="true"
                                checked={state.poliza === "N"}
                                id="no"
                                name="desestimada"
                                onChange={(e) => setState({ ...state, poliza: "N" })}
                            />
                            <label
                                htmlFor="poliza1"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>No</b>
                            </label>
                        </div>
                        <div className="col-sm-2">
                            <RadioButton
                                inputId="poliza2"
                                value="true"
                                checked={state.poliza === "S"}
                                id="si"
                                name="desestimada"
                                onChange={(e) => setState({ ...state, poliza: "S" })}
                            />
                            <label
                                htmlFor="poliza2"
                                style={{ transform: "translate(10px,7px)" }}
                            >
                                <b>Sí</b>
                            </label>
                        </div>
                        <div className=" col-sm-8">
                            <div className="field">
                                <Calendar
                                    id="icon"
                                    value={new Date(state.vencePoliza)}
                                    onChange={(e) => setState({ ...state, vencePoliza: e.value })}
                                    showIcon
                                    dateFormat="yy-mm-dd"
                                />
                            </div>
                        </div>
                    </div>
                    <Divider align="left"></Divider>
                    <div className='container'>
                        <div className="row justify-content-between">
                            <div className="col-4">
                                <ButtonSiguiente dir="informacionencargado" nom="anterior" icono="pi pi-arrow-left" />
                            </div>
                            <div className="col-4">
                                <Button label="Matrícula" icon="pi pi-save" className="p-button-sm p-button-rounded p-button-info"
                                    onClick={() => Matricula({ valueEst: state }, { valueEnc: state })} />
                            </div>
                        </div>
                    </div>
                    {/*} <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="Matricula"
                  onClick={() => Matricula({ valueEst: state }, { valueEnc: state })}
                >
                  Matricula
                </button>
              </div>
                  </div>*/}
                </div>
                <br />

            </div>
        </div>
    );
}
