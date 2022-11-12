import { useRef, useContext, useState, useEffect } from "react";
import { infoEncargado, infoContacto } from "../AppContext/providerInfoEncargado";
import { ObtenerEstudiante } from "../Persistencia/EstudianteService";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { PaisService, ProvinciaService, CantonService, DistritoService } from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';

import {infoProfesores} from "../AppContext/providerProfesores";

import { Tag } from 'primereact/tag';



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
    return (
        <div className="form-demo" style={{ height: 'auto' }}>
            <span className="titleBlack">Información Personal</span>
            <br />
            <div class="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                <div class="row ">
                    <div class="col-sm offset-md-2">
                        <div className="field">
                            <label><b>Cédula:</b></label>{" "}
                            <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                <InputText
                                    style={{ width: '30px' }}
                                    id="inputtext"
                                    keyfilter="num"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.cedula}
                                    onChange={(e) =>
                                        setState({ ...state, cedula: e.target.value })}
                                    required />
                                <Button
                                    icon="pi pi-search"
                                    id="Buscar2"
                                    className="p-button-warning"
                                    onClick={() => {
                                        ObtenerEstudiante({ state: state, setState: setState });
                                    }} />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm  ">
                        <div className="field">
                            <label><b>Fecha nacimiento:</b></label>{" "}
                            <div className="field col-12 md:col-4 p-float-label">
                                <Calendar
                                    className="p-inputtext-sm block mb-2"
                                    inputId="calendar" id="fnacimiento"
                                    value={state.fechNac}
                                    onChange={(e) =>
                                        setState({ ...state, fechNac: e.target.value })}
                                    touchUI />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class=" col-sm">
                        <div className="field">
                            <label><b>Primer nombre:</b></label>{" "}
                            <div>
                                <InputText
                                    id="inputtext"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.pNombre}
                                    onChange={(e) =>
                                        setState({ ...state, pNombre: e.target.value, })}
                                    required 
                                    style={{ width: '90%' }} />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="field">
                            <label><b>Segundo nombre:</b></label>
                            <div>
                                <InputText
                                    id="inputtext"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.sNombre}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, sNombre: e.target.value, })}
                                    required />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm ">
                        <div className="field">
                            <label><b>Primer apellido:</b></label>
                            <div>
                                <InputText
                                    id="inputtext"
                                    className="p-inputtext-sm block mb-2"
                                    value={state.pApellido}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, pApellido: e.target.value, })}
                                    required />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="field">
                            <label><b>Segundo apellido:</b></label>
                            <div>
                                <InputText
                                    id="inputtext"
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
                <div class="row">
                    <div class="col-sm">
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
                                    style={{ width: 'auto' }} />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm">
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
                                        Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === state.provincia.code)))}
                                    onChange={(e) =>
                                        setState({ ...state, canton: e.target.value })
                                    }
                                    optionLabel="name" 
                                    style={{ width: 'auto' }}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm">
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
                                        Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton.code)))}
                                    placeholder="Distrito"
                                    onChange={(e) =>
                                        setState({ ...state, distrito: e.target.value })
                                    }
                                    optionLabel="name" 
                                    style={{ width: 'auto' }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label><b>Dirección exacta:</b></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm ">
                        <InputTextarea
                            className="p-inputtext-sm block mb-2"
                            value={state.direccion}
                            onChange={(e) =>
                                setState({ ...state, direccion: e.target.value })}
                            rows={1}
                            autoResize
                            style={{ transform: 'translateX(5px)', width: '98%' }} />
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class="col-sm-2">
                        <label className="sexo"><b>Sexo:</b></label>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-sm-auto col-sm-5">
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
                    <div class="col-sm-auto">
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
                <div class="row">
                    <div class="col-auto">
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
                                optionLabel="name" />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class="col">
                        <label><b>Contacto:</b></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <label><b>Correo Electrónico:</b></label>
                        <div>
                            <InputText
                                id="inputtext"
                                className="p-inputtext-sm block mb-2"
                                style={{ width:'70%' }}
                                value={stateCon.cElectronico}
                                keyfilter={/[^\s]/}
                                onChange={(e) =>
                                    setStateCon({
                                        ...stateCon, cElectronico: e.target.value,
                                    })}
                                required />
                        </div>
                    </div>
                    <div class="col-sm">
                        <label><b>Número de Teléfono:</b></label>
                        <div>
                            <InputText
                                id="inputtext"
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
    const [value2, setValue2] = useState('');
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };

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


        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {/* {"Hola mundo"}*/}
            </div>
        );
    }
    const itemTemplate = (file, props) => {
        setValue2( file.objectURL )
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundPosition: '50%', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }}>
                    <img alt={file.name} role="presentation" onBeforeInput={(e) =>
                                    setState({
                                        ...state,
                                        Perfil: e.target.src,
                                    })
                                } src={file.objectURL} width={200} />
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
        { name: 'Maestría' },
        { name: 'Doctorado' }
    ];
    return (
        <div className="form-demo">
            <span className="titleBlack">Información Profesional y Laboral</span>
            <div class="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}  >
                
                <br />
                <div class="row" >
                    <div class="col-sm">
                        <label><b>Nivel escolar:</b></label>
                        <div>
                            <Dropdown inputId="dropdown"
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
                                optionLabel="name" />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class="col-sm">
                        <label><b>Fecha de ingreso a la institución:</b></label>{" "}
                        <div className="field col-12 md:col-4 p-float-label">
                            <Calendar
                                inputId="calendar"
                                id="fingreso"
                                value={state.fechIng}
                                onChange={(e) =>
                                    setState({ ...state, fechIng: e.target.value })} touchUI />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class="col-sm">
                        <label>Lugar de Trabajo:</label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                name="lugarTrabajo"
                                id="lugarTrabajo"
                                className="p-inputtext-sm block mb-2"
                                value={state.lugarTrabajo}
                                placeholder="Lugar de Trabajo"
                                autoResize
                                onChange={(e) =>
                                    setState({ ...state, lugarTrabajo: e.target.value, })}
                                optionLabel="name" />
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="field">
                            <label><b>Experiencia laboral:</b></label>{" "}
                            <div>
                                <InputText
                                    id="inputtext"
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
                <div class="row">
                    <div class="col-sm">
                        <label><b>Información adicional (pasatiempos, gustos, etc):</b></label>{" "}
                        <div>
                            <InputTextarea
                                value={state.descrip}
                                onChange={(e) =>
                                    setState({ ...state, descrip: e.target.value })}
                                rows={5}
                                style={{ transform: 'translateX(5px)', width: '98%' }}
                                autoResize />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div class="row">
                    <div class="col-sm">
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
                            <Button 
                            type="button" 
                            icon="pi pi-times" 
                            className="p-button-outlined p-button-rounded p-button-danger ml-auto" 
                            onClick={() => console.log("Imagen ", value2,"  hola  ",state.Perfil)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
