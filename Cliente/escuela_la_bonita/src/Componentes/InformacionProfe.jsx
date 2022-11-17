import { useRef, useContext, useState, useEffect } from "react";
import {ObtenerProfesor,
        ObtenerCont,
        ObtenerInstitucion,
        agregarFun,
        agregarPersona,
        agregarContacto } from "../Persistencia/FuncionarioService";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import {PaisService, 
        ProvinciaService, 
        CantonService, 
        DistritoService } from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import {infoProfesores,infoContacto} from "../AppContext/providerProfesores";
import { ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';


export function InfoPersonal() {
    const [state, setState] = useContext(infoProfesores);
    const [stateCon, setStateCon] = useContext(infoContacto);
    const Distrito = new DistritoService();
    const Canton = new CantonService();
    const Provincia = new ProvinciaService();
    const Pais = new PaisService();
    const [countries, setCountries] = useState([]);
    const [pro, setProvincia] = useState([]);
    const [Can, setCanton] = useState([]);
    const [Dis, setDistrito] = useState([]);
    useEffect(() => {
        Pais.getPais().then(data => setCountries(data));
        Provincia.getProvincia().then(data => setProvincia(data));
      
    }, []);
    useEffect(() => {
        if (state.provincia) {
            Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia)));
            Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)));
        }
    }, [state.provincia]);
    const Estado = [
        { name: 'Soltero',code:'S' },
        { name: 'Casado',code:'C' },
        { name: 'Unión libre',code:'U' },
        { name: 'Divorciado(a)',code:'D' },
        { name: 'Viudo(a)',code:'V' },
        { name: 'Separado(a)',code:'E'}
    ];
    function delayAddOne() {
       
            ObtenerProfesor({ state: state, setState: setState });
            ObtenerCont({ state: stateCon, setState: setStateCon, idFun: state.cedula })
            console.log("Entre ", state.provincia)
    
      }
    return (
        <div className="form-demo" style={{ height: 'auto' }}>
            <span className="titleBlack">Información Personal</span>
            <br />
            <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                <div className="row ">
                    <div className="col-sm offset-md-2">
                        <div className="field">
                            <label><b>Cédula:</b></label>{" "}
                            <div className="p-inputgroup" style={{ width: '70%', transform: 'translateX(23%)' }}>
                                <InputText
                                    style={{ width: '30px' }}
                                    id="cedula"
                                    keyfilter="num"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.cedula}
                                    onChange={(e) =>
                                        setState({ ...state, cedula: e.target.value })}
                                     />
                                <Button
                                    icon="pi pi-search"
                                    id="Buscar2"
                                    className="p-button-warning"
                                    onClick={delayAddOne} />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm  ">
                        <div className="field">
                            <label><b>Fecha nacimiento:</b></label>{" "}
                            <div className="field col-12 md:col-4 p-float-label">
                                <Calendar
                                    className="p-inputtext-sm block mb-2"
                                    inputId="calendar" id="fnacimiento"
                                    value={state.fechNac}
                                    onChange={(e) =>
                                        setState({ ...state, fechNac:e.target.value })}
                                    touchUI />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className=" col-sm">
                        <div className="field">
                            <label><b>Primer nombre:</b></label>{" "}
                            <div>
                                <InputText
                                    id="pnombre"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.pNombre}
                                    onChange={(e) =>
                                        setState({ ...state, pNombre: e.target.value, })}
                                    required 
                                    style={{ width: '90%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Segundo nombre:</b></label>
                            <div>
                                <InputText
                                    id="snombre"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.sNombre}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, sNombre: e.target.value, })}
                                    required />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm ">
                        <div className="field">
                            <label><b>Primer apellido:</b></label>
                            <div>
                                <InputText
                                    id="papellido"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.pApellido}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, pApellido: e.target.value, })}
                                    required />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Segundo apellido:</b></label>
                            <div>
                                <InputText
                                    id="sapellido"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.sApellido}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, sApellido: e.target.value, })}
                                    required />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Provincia:</b></label>
                            <div>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Provincia"
                                    id="Provincia"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.provincia}
                                    options={pro}
                                    placeholder="Provincia"
                                    onChange={(e) =>
                                        setState({ ...state, provincia: e.target.value, })}
                                    optionLabel="name"
                                    optionValue="code"
                                    style={{ width: 'auto' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Cantón:</b></label>
                            <div>
                                <Dropdown
                                    inputId="dropdown"
                                    value={state.canton}
                                    className="p-inputtext-sm block mb-2"
                                    name="Canton"
                                    id="Canton"
                                    placeholder="Cantón"
                                    options={Can}
                                    onClickCapture={(e) =>
                                        Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia)))}
                                    onChange={(e) =>
                                        setState({ ...state, canton: e.target.value })
                                    }
                                    optionLabel="name" 
                                    optionValue="code"
                                    style={{ width: 'auto' }}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Distrito:</b></label>
                            <div>
                                <Dropdown
                                    inputId="dropdown"
                                    name="Distrito"
                                    id="Distrito"
                                    value={state.distrito}
                                    className="p-inputtext-sm block mb-2"
                                    options={Dis}
                                    onClickCapture={(e) =>
                                        Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))}
                                    placeholder="Distrito"
                                    onChange={(e) =>
                                        setState({ ...state, distrito: e.target.value })
                                    }
                                    optionLabel="name" 
                                    optionValue="code"
                                    style={{ width: 'auto' }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label><b>Dirección exacta:</b></label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm ">
                        <InputTextarea
                            id="direccion"
                            className="p-inputtext-sm block mb-2"
                            value={state.direccion}
                            autoResize 
                            onChange={(e) =>
                                setState({ ...state, direccion: e.target.value })}
                            rows={1}
                            style={{ transform: 'translateX(5px)', width: '98%' }} />
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm-2">
                        <label className="sexo"><b>Sexo:</b></label>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-auto col-sm-5">
                        <RadioButton
                            inputId="city1"
                            value="true"
                            checked={state.sexo === "M"}
                            id="Hombre"
                            name="sexoest"
                            onChange={(e) =>
                                setState({ ...state, sexo: "M" })} />
                        <label
                            htmlFor="city1"
                            style={{ transform: 'translate(10px,7px)' }}>
                            <b>Hombre</b> 
                        </label>
                    </div>
                    <div className="col-sm-auto">
                        <RadioButton
                            inputId="city2"
                            value="true"
                            checked={state.sexo === "F"}
                            id="Mujer"
                            name="sexoest"
                            onChange={(e) =>
                                setState({ ...state, sexo: "F" })} />
                        <label
                            htmlFor="city2"
                            style={{ transform: 'translate(10px,7px)' }}>
                            <b>Mujer</b> 
                        </label>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Lugar de nacimiento:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                name="lugarnacimiento"
                                id="lugarnacimiento"
                                className="p-inputtext-sm block mb-2"
                                value={state.lugarnacimiento}
                                options={countries}
                                filter showClear filterBy="name"
                                placeholder="Lugar de nacimiento"
                                style={{ width: '100%' }}
                                onChange={(e) =>
                                    setState({ ...state, lugarnacimiento: e.target.value, })}
                                optionLabel="name"
                                optionValue="name" />
                        </div>
                    </div>
                    <div className="col-sm">
                        <label><b>Estado Civil:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                className="p-inputtext-sm block mb-2"
                                name="EstadoCivil"
                                id="EstadoCivil"
                                value={state.estadoCivil}
                                options={Estado}
                                placeholder="Estado Civil"
                                style={{ width: '100%' }}
                                onChange={(e) =>
                                    setState({
                                    ...state,
                                    estadoCivil: e.target.value,
                                    })
                                }
                                optionLabel="name"
                                optionValue="code" />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col">
                        <label><b>Contacto:</b></label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Correo Electrónico:</b></label>
                        <div>
                            <InputText
                                id="Correo"
                                className="p-inputtext-sm block mb-2"
                                style={{ width:'75%' }}
                                value={stateCon.cElectronico}
                                keyfilter={/[^\s]/}
                                onChange={(e) =>
                                    setStateCon({
                                        ...stateCon, cElectronico: e.target.value,
                                    })}
                                required />
                        </div>
                    </div>
                    <div className="col-sm">
                        <label><b>Número de Teléfono:</b></label>
                        <div>
                            <InputText
                                id="telefono"
                                className="p-inputtext-sm block mb-2"
                                value={stateCon.numTelefono}
                                keyfilter="num"
                                style={{ width: '40%' }}
                                onChange={(e) =>
                                    setStateCon({
                                        ...stateCon, numTelefono: e.target.value,
                                    })}
                                required />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export function InfoProfesor() {
    const [state, setState] = useContext(infoProfesores);
    const [stateCon, setStateCon] = useContext(infoContacto);
    const [value2, setValue2] = useState('');
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [Institucion, setInstitucion] = useState([]);
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const toast1 = useRef(null);
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        console.log("Hola " )
       const obtenerIns = async () =>{
        console.log("Hola 2 " )
        const res=await ObtenerInstitucion();
        console.log("Hola 3 ", res )
        setInstitucion(res);
       }
       obtenerIns();
      },[]);

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });
        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }
    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        if(className){
        return (
            <div className={className} onMouseLeave={()=>setState({...state,Perfil: value2})} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {/* {"Hola mundo"}*/}
            </div>
        );
        }
    }
    const itemTemplate = (file, props) => {
        setValue2( file.objectURL )
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '30%', height: '50%', borderRadius: '50%', backgroundPosition: '50%', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }}>
                    <img alt={file.name} role="presentation" src={state.Perfil}  width={'100%'} />
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }
    const cities = [
        { name: 'Bachillerato' },
        { name: 'Bachillerato Universitario' },
        { name: 'Licenciatura' },
        { name: 'Maestría', code:'Maestría' },
        { name: 'Doctorado' }
    ];

    //Mensaje de confirmacion y efecto de carga del boton de guardar
    const accept = () => {
        toast1.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted ha aceptado', life: 3000 });
        agregarPersona({ state: state, setState: setState });
        agregarFun({ state: state, setState: setState });
        agregarContacto({ cedula: state.cedula, tCotacto: "Teléfono" , contacto: stateCon.numTelefono })
        agregarContacto({ cedula: state.cedula, tCotacto: "Correo", contacto: stateCon.cElectronico })
        onLoadingClick2();
    }

    const reject = () => {
        toast1.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
    }
    const confirm1 = () => {
        confirmDialog({
            message: 'Estas seguro que deseas continuar?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };
    const onLoadingClick2 = () => {
        setLoading2(true);

        setTimeout(() => {
            setLoading2(false);
        }, 2000);
    }
    return (
        <div className="form-demo">
            <Toast ref={toast1} />
            <span className="titleBlack">Información Profesional y Laboral</span>
            <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}  >
                <br />
                <div className="row" >
                    <div className="col-sm">
                        <label><b>Nivel escolar:</b></label>
                        <div>
                            <Dropdown inputId="dropdown"
                                className="p-inputtext-sm block mb-2"
                                name="Nivel escolar"
                                id="Nivelescolar"
                                value={state.Nescolar}
                                options={cities}
                                placeholder="Nivel escolar"
                                required
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        Nescolar: e.target.value,
                                    })
                                }
                                optionLabel="name"
                                optionValue="name"/>
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Fecha de ingreso a la institución:</b></label>{" "}
                        <div className="field col-12 md:col-4 p-float-label">
                            <Calendar
                                className="p-inputtext-sm block mb-2"
                                inputId="calendar"
                                id="fingreso"
                                value={state.fechIng}
                                onChange={(e) =>
                                    setState({ ...state, fechIng: e.target.value })} touchUI />
                                
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label>Lugar de Trabajo:</label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                name="lugarTrabajo"
                                id="lugarTrabajo"
                                className="p-inputtext-sm block mb-2"
                                value={state.lugarTrabajo}
                                placeholder="Lugar de Trabajo"
                                options={Institucion}
                                onChange={(e) =>
                                    setState({ ...state, lugarTrabajo: e.target.value, })}
                                optionLabel="Institucion"
                                optionValue="Institucion" />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Experiencia laboral:</b></label>{" "}
                            <div>
                                <InputText
                                    id="experiencia"
                                    keyfilter="num"
                                    value={state.Atrabajo}
                                    placeholder="Años laborados"
                                    onChange={(e) =>
                                        setState({ ...state, Atrabajo: e.target.value })}
                                    required />
                            </div>

                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Información adicional (pasatiempos, gustos, etc):</b></label>{" "}
                        <div>
                            <InputTextarea
                                id="descrpcion"
                                value={state.descrip}
                                autoResize 
                                onChange={(e) =>
                                    setState({ ...state, descrip: e.target.value })}
                                rows={5}
                                style={{ transform: 'translateX(5px)', width: '98%' }} />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Foto de perfil:</b></label>{" "}
                        <div>
                            <FileUpload
                                ref={fileUploadRef}
                                name="demo[]"
                                url="https://primefaces.org/primereact/showcase/upload.php"
                                accept="image/*"
                                onUpload={onTemplateUpload}
                                onError={onTemplateClear}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                            />
                           {/* <Button 
                            type="button" 
                            icon="pi pi-times" 
                            className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                            onClick={() => console.log("I " ,Institucion)} /> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                    <ConfirmDialog />
                        <Button label="Guardar" loading={loading2} onClick={confirm1} className="mr-2"/>
                    </div>
                </div>
            </div>
        </div>

    );
}
