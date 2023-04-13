import { ButtonSiguiente } from "../Componentes/Utils";
import { useContext, useState, useEffect, useRef } from "react";
import { infoProfesores, infoContacto } from "../AppContext/providerProfesores";
import { InfoPersonal, InfoProfesor } from "../Componentes/InformacionProfe";
import { TabView, TabPanel } from 'primereact/tabview';
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Crear from "../Recursos/Crear.png";
import Editar from "../Recursos/Editar.png";
import Eliminar from "../Recursos/Eliminar.png";
import { Tooltip } from 'primereact/tooltip';
import { Card } from 'primereact/card';
import {
  agregarFun,
  agregarPersona,
  agregarContacto,
  ObtenerProfesor,
  Eliminarfun,
  ObtenerImgFunc, 
  GuardarFoto
} from "../Persistencia/FuncionarioService";
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { msjRequeridos, } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
export default function Inicio() {
  const navegar = useNavigate();
  const [state, setState] = useContext(infoProfesores);
  const [stateCon, setStateCon] = useContext(infoContacto);
  const [activeIndex, setActiveIndex] = useState(0);
  const [requerido, setrequerido] = useState(false);
  const toast = useRef(null);
  const [Creavisible, setCreaVisible] = useState(false);
  const [Editavisible, setEditaVisible] = useState(false);
  const [Eliminarvisible, setEliminarvisible] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [render, setRender] = useState(false);
  const [render2, setRender2] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (event) => {
    const selectedImage = event.target.files[0];
    const newFile = new File([selectedImage], state.cedula + '-' + selectedImage.name, { type: selectedImage.type });
    console.log("SELECCIONADA", newFile.name)
    setImage(newFile);
    setImageUrl(URL.createObjectURL(selectedImage));
    console.log("IMAGEN 2", imageUrl)
  }

  const onLoadingClick2 = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  }

  useEffect(() => {
    if (state.pNombre) {
      setState({ ...state, NombreCom: state.pNombre + ' ' + state.sNombre + ' ' + state.pApellido + ' ' + state.sApellido, })
    }
  }, [state.pNombre]);

  useEffect(() => {
    const obtenerFoto = async () => {
      console.log("esta picha de cedula", state.cedula)
      if (state.cedula){
        const imageUrl = await ObtenerImgFunc(state.cedula);
        if (imageUrl !== null) {
          setImageUrl(imageUrl);
        } else {
          //va el error del servidor
        }
      } else{
        console.log("Cedula ",state.cedula)
      }
    }
    obtenerFoto();
  }, [state.cedula]);

  const Guardar = async () => {
    setrequerido(true);
    console.log("Todo ", state);
    console.log("Todo2 ", stateCon);
    if (state.cedula && state.fechNac && state.pNombre && state.sNombre && state.pApellido && state.sApellido && state.provincia
      && state.canton && state.distrito && state.direccion && state.sexo && state.lugarnacimiento && state.estadoCivil
      && stateCon.numTelefono && stateCon.cElectronico) {
      await agregarPersona({ state: state, setState: setState });
      await agregarContacto({ cedula: state.cedula, tCotacto: "Teléfono", contacto: stateCon.numTelefono })
      await agregarContacto({ cedula: state.cedula, tCotacto: "Correo", contacto: stateCon.cElectronico })
      await agregarFun({ state: state, setState: setState });
      onLoadingClick2();
      //setCreaVisible(false);
      window.location.reload();
    }
    else {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Faltan datos por llenar sfasd', life: 3000 });
    }

  };

  const GuardarPerfil = async ()=>{
    await agregarFun({ state: state, setState: setState });
    await GuardarFoto({cedula: state.cedula, image:image })
    window.location.reload();
  };
  async function delayAddOne() {
    if (Editavisible)
      await ObtenerProfesor({ state: state, setState: setState, estado: 'A' });
    setRender(true);
  }
  const cancelar = ()=>{
    setCreaVisible(false)
    window.location.reload();
  };

  const footerContent = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={cancelar} className="p-button-text" />
      <Button label="Guardar" icon="pi pi-check" loading={loading2} onClick={Guardar} autoFocus />
    </div>
  );

  
  const botonesPerfil = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={cancelar} className="p-button-text" />
      <Button label="Guardar" icon="pi pi-check" loading={loading2} onClick={GuardarPerfil} autoFocus />
    </div>
  );
  //Mensaje de confirmacion y efecto de carga del boton de guardar
  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted ha aceptado', life: 3000 });
    Eliminarfun({ state: state, setState: setState });
    console.log("Entre a borrar")
    window.location.reload();
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
  }
  const confirm1 = () => {
    setrequerido(true);
    setCreaVisible(false);
    //console.log("Datos faltantes ",validar(state,stateCon));
    if (state.cedula) {
      confirmDialog({
        message: 'Estas seguro que deseas eliminar a ' + state.NombreCom + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept,
        reject,
        acceptLabel: "Sí",
        rejectLabel: "No"
      });
      setrequerido(false);
    } else {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Faltan datos por llenar', life: 3000 });
    }
  };
  const footerContent2 = (
    <div>
      <ConfirmDialog />
      <Button label="Eliminar" icon="pi pi-trash" loading={loading2} onClick={confirm1} className="p-button-danger" />
    </div>
  );
  return (
    <div>
      {" "}
      <Header />
      <Toast ref={toast} />
      <div id="rootprofesores" className="Div" >
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Información personal del profesor</span>
        <div className="container">
          <div className="row justify-content-md-center " >
            <div className="col-md d-flex justify-content-center ">
              <Tooltip target=".Crear" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de creación y edición de funcionarios</label>
              </Tooltip>

              <Card
                className="Crear"
                id="Crear"
                header={<img alt="Card" src={Crear} />}
                onClick={() => setCreaVisible(true)}>
                <h3>Crear y editar Funciocionario</h3>
              </Card>
            </div>
            <div className="col-md d-flex justify-content-center">
              <Tooltip target=".Editar" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de creación y edición de perfiles de funcionarios</label>
              </Tooltip>

              <Card
                className="Editar"
                id="Editar"
                header={<img alt="Card" src={Editar} />}
                onClick={() => setEditaVisible(true)}>
                <h3>Crear y Editar perfil de Funciocionario</h3>
              </Card>

            </div>

            <div className="col-md d-flex justify-content-center ">
              <Tooltip target=".Eliminar" position="top" mouseTrack mouseTrackLeft={10}>
                <label>Sistema de eliminación de perfiles de funcionarios</label>
              </Tooltip>

              <Card
                className="Eliminar"
                id="Eliminar"
                header={<img alt="Card" src={Eliminar} />}
                onClick={() => setEliminarvisible(true)}>
                <h3>Eliminar Funciocionario</h3>
              </Card>
            </div>
          </div>
        </div>
        {/*Creacion de perfiles */}
        <Dialog header="Crear y editar perfil " visible={Creavisible} maximizable style={{ width: '90%' }} onHide={() => setCreaVisible(false)} footer={footerContent}>
          <TabView className="tabProfesores" style={{ textAlign: 'center' }} >
            <TabPanel header="Información Personal" leftIcon="pi pi-user">
              <InfoPersonal setState={setState} state={state} Requerido={requerido} />
            </TabPanel>
            <TabPanel header="Información Profesional" leftIcon="pi pi-building">
              <InfoProfesor setState={setState} state={state} Requerido={requerido} Setrequerido={setrequerido} />
            </TabPanel>
          </TabView>
        </Dialog>
        {/*Edición de perfiles */}
        <Dialog header="Crear perfil" visible={Editavisible} maximizable style={{ width: '90%' }} onHide={() => setEditaVisible(false)} footer={botonesPerfil}>
          <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
            <div className="row ">
              <div className="col-sm offset-md-2">
                <div className="field">
                  <label><b>Cédula:</b></label>{" "}
                  <div className="p-inputgroup" style={{ width: '70%' }}>
                    <InputText
                      style={{ width: '30px' }}
                      id="cedula"
                      keyfilter="int"
                      //ref={inputRefs[0]}
                      //onKeyDown={(event) => compoSiguente(event, 0)}
                      className={requerido && !state.cedula ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                      value={state.cedula ? state.cedula : ''}
                      onChange={(e) =>
                        setState({ ...state, cedula: e.target.value })}
                      required
                    />

                    <Button
                      icon="pi pi-search"
                      id="Buscar2"
                      className="p-button-warning"
                      onClick={delayAddOne}
                    />
                  </div>
                  {requerido && !state.cedula && <small className="p-error">{msjRequeridos}</small>}
                  <div>
                  </div>
                </div>
              </div>
              <div className=" col-sm">
                {render &&
                  <div className="field">
                    <label><b>Nombre:</b></label>{" "}
                    <div>
                      <InputText
                        id="pnombre"
                        //ref={inputRefs[1]}
                        //onKeyDown={(event) => compoSiguente(event, 1)}
                        className={requerido && !state.pNombre ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                        value={state.NombreCom ? state.NombreCom : ''}
                        onChange={(e) =>
                          setState({ ...state, NombreCom: e.target.value, })}
                        required
                        style={{ width: '100%' }} />
                    </div>
                    {requerido && !state.NombreCom && <small className="p-error">{msjRequeridos}</small>}
                  </div>}
              </div>
              {render &&
                <div>
                  <Divider align="left" ></Divider>
                  <div className="row">

                    <label style={{ width: '100%' }}><b>Información adicional:</b></label>{" "}
                    <div>
                      <InputTextarea
                        id="descrpcion"
                        value={state.descrip}
                        className={requerido && !state.descrip ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                        autoResize
                        onChange={(e) =>
                          setState({ ...state, descrip: e.target.value })}
                        rows={5}
                        style={{ transform: 'translateX(5px)', width: '98%' }} />
                    </div>
                    {requerido && !state.descrip && <small className="p-error">{msjRequeridos}</small>}

                  </div>
                  <Divider align="left" ></Divider>
                  <div className="row">
                    <div className="col-sm">
                      <label><b>Foto de perfil:</b></label>{" "}
                      <div style={{ borderRadius: '1px', border: '1px solid rgb(155, 155, 155, 0.40)', width: '100%' }}>
                        <div className="container">
                          <br />
                          <div className="row justify-content-center" >

                            {imageUrl && <img src={imageUrl} className="Imgperfil" alt="Selected image"
                              style={{ borderRadius: "100%", border: '5px solid rgb(212, 175, 55, 1)',width:'30%' }}  />}
                          </div>
                          <div className="row justify-content-center" >
                            <div className="container-input " >
                              <input type="file"
                                onChange={handleChange}
                                value={state.Perfil}
                                accept="image/*"
                                name="file-2"
                                id="file-2"
                                className="inputfile inputfile-2"
                                data-multiple-caption="{count} archivos seleccionados" />
                              <label htmlFor="file-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20"
                                  height="17" viewBox="0 0 20 17">
                                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                <span className="iborrainputfile">Seleccionar archivo</span>
                              </label>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </Dialog>
        {/*Elimiar Perfiles*/}
        <Dialog header="Editar" visible={Eliminarvisible} maximizable style={{ width: '90%' }} onHide={() => setEliminarvisible(false)} footer={footerContent2}>
          <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
            <div className="row ">
              <div className="col-sm offset-md-2">
                <div className="field">
                  <label><b>Cédula:</b></label>{" "}
                  <div className="p-inputgroup" style={{ width: '70%' }}>
                    <InputText
                      style={{ width: '30px' }}
                      id="cedula"
                      keyfilter="int"
                      //ref={inputRefs[0]}
                      //onKeyDown={(event) => compoSiguente(event, 0)}
                      className={requerido && !state.cedula ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                      value={state.cedula ? state.cedula : ''}
                      onChange={(e) =>
                        setState({ ...state, cedula: e.target.value })}
                      required
                    />

                    <Button
                      icon="pi pi-search"
                      id="Buscar2"
                      className="p-button-warning"
                      onClick={delayAddOne}
                    />
                  </div>
                  {requerido && !state.cedula && <small className="p-error">{msjRequeridos}</small>}
                  <div>
                  </div>
                </div>
              </div>
              <div className=" col-sm">
                <div className="field">
                  <label><b>Nombre:</b></label>{" "}
                  <div>
                    <InputText
                      id="pnombre"
                      //ref={inputRefs[1]}
                      //onKeyDown={(event) => compoSiguente(event, 1)}
                      className={requerido && !state.pNombre ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                      value={state.NombreCom ? state.NombreCom : ''}
                      onChange={(e) =>
                        setState({ ...state, NombreCom: e.target.value, })}
                      required
                      style={{ width: '100%' }} />
                  </div>
                  {requerido && !state.NombreCom && <small className="p-error">{msjRequeridos}</small>}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}

      </div>
    </div>
  );
}