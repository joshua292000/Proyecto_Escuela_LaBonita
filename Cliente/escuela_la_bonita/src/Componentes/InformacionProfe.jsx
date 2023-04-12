import React, { useRef, useContext, useState, useEffect } from "react";
import {
    ObtenerProfesor,
    ObtenerCont,
    ObtenerInstitucion,
    agregarFun,
    agregarPersona,
    agregarContacto,
    agregarFoto,
    ObtenerFotoFuncionario
} from "../Persistencia/FuncionarioService";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import Swal from 'sweetalert2';
import {
    PaisService,
    ProvinciaService,
    CantonService,
    DistritoService
} from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { infoProfesores, infoContacto } from "../AppContext/providerProfesores";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { msjRequeridos, msjAdCe, msjAdCorreo } from "../Componentes/Utils";
import { addLocale } from 'primereact/api';
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';



export function InfoPersonal(props) {
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
    const [correovalido, setCorreoValido] = useState(true);
    const [_cedula, set_cedula] = useState(0);
    const toast1 = useRef(null);

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

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
        { name: 'Soltero', code: 'S' },
        { name: 'Casado', code: 'C' },
        { name: 'Unión libre', code: 'U' },
        { name: 'Divorciado(a)', code: 'D' },
        { name: 'Viudo(a)', code: 'V' },
        { name: 'Separado(a)', code: 'E' }
    ];
    const delayAddOne = async () => {
        await ObtenerProfesor({ state: state, setState: setState, estado: 'A' });
        await ObtenerCont({ state: stateCon, setState: setStateCon, idFun: state.cedula });
    }
    const validarCorre = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(stateCon.cElectronico);
    };

    useEffect(() => {
        setCorreoValido(validarCorre());
    }, [stateCon.cElectronico]);


    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const compoSiguente = async (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const _sigInput = index + 1;
            if (index === 0) {
                if (state.cedula) {
                    set_cedula(1);
                    // ObtenerProfesor({ state: state, setState: setState });

                } else {
                    toast1.current.show({ severity: 'warn', summary: 'Advertencia', detail: msjAdCe, life: 3000 });
                }
            }
            if (_sigInput < inputRefs.length && _cedula != 0) {
                inputRefs[_sigInput].current.focus();
            }
        }
    }
    return (
        <div className="form-demo" style={{ height: 'auto' }}>
            <Toast ref={toast1} />
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
                                    keyfilter="int"
                                    ref={inputRefs[0]}
                                    onKeyDown={(event) => compoSiguente(event, 0)}
                                    className={props.Requerido && !state.cedula ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    value={state.cedula ? state.cedula : ''}
                                    onChange={(e) =>
                                        setState({ ...state, cedula: e.target.value })}
                                    required
                                />

                                <Button
                                    icon="pi pi-search"
                                    id="Buscar2"
                                    className="p-button-warning"
                                    onClick={delayAddOne} />
                            </div>
                            {props.Requerido && !state.cedula && <small className="p-error">{msjRequeridos}</small>}
                            <div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm  ">
                        <div className="field">
                            <label><b>Fecha nacimiento:</b></label>{" "}
                            <div className="field col-12 md:col-4 p-float-label">
                                <Calendar

                                    className={props.Requerido && !state.fechNac ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    inputId="calendar"
                                    id="fnacimiento"
                                    dateFormat="dd-mm-yy"
                                    locale="es"
                                    required
                                    showIcon
                                    value={new Date(state.fechNac)}
                                    onChange={(e) =>
                                        setState({ ...state, fechNac: e.value.toLocaleDateString('en-ZA') })}
                                />
                            </div>
                            {props.Requerido && !state.fechNac && <small className="p-error">{msjRequeridos}</small>}
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
                                    ref={inputRefs[1]}
                                    onKeyDown={(event) => compoSiguente(event, 1)}
                                    className={props.Requerido && !state.pNombre ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    value={state.pNombre ? state.pNombre : ''}
                                    onChange={(e) =>
                                        setState({ ...state, pNombre: e.target.value, })}
                                    required
                                    style={{ width: '90%' }} />
                            </div>
                            {props.Requerido && !state.pNombre && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Segundo nombre:</b></label>
                            <div>
                                <InputText
                                    id="snombre"
                                    className="p-inputtext-sm block mb-2"
                                    ref={inputRefs[2]}
                                    onKeyDown={(event) => compoSiguente(event, 2)}
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
                                    ref={inputRefs[3]}
                                    onKeyDown={(event) => compoSiguente(event, 3)}
                                    className={props.Requerido && !state.pApellido ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    value={state.pApellido}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, pApellido: e.target.value, })}
                                    required />
                            </div>
                            {props.Requerido && !state.pApellido && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Segundo apellido:</b></label>
                            <div>
                                <InputText
                                    id="sapellido"
                                    ref={inputRefs[4]}
                                    onKeyDown={(event) => compoSiguente(event, 4)}
                                    className={props.Requerido && !state.sApellido ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    value={state.sApellido}
                                    style={{ width: '90%' }}
                                    onChange={(e) =>
                                        setState({ ...state, sApellido: e.target.value, })}
                                    required />
                            </div>
                            {props.Requerido && !state.sApellido && <small className="p-error">{msjRequeridos}</small>}
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
                                    className={props.Requerido && !state.provincia ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    value={state.provincia}
                                    options={pro}
                                    placeholder="Provincia"
                                    onChange={(e) =>
                                        setState({ ...state, provincia: e.target.value, })}
                                    optionLabel="name"
                                    optionValue="code"
                                    style={{ width: 'auto' }} />
                            </div>
                            {props.Requerido && !state.provincia && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Cantón:</b></label>
                            <div>
                                <Dropdown
                                    inputId="dropdown"
                                    value={state.canton}
                                    className={props.Requerido && !state.canton ? 'p-invalid' : "p-inputtext-sm block mb-2"}
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
                                    style={{ width: 'auto' }} />
                            </div>
                            {props.Requerido && !state.canton && <small className="p-error">{msjRequeridos}</small>}
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
                                    className={props.Requerido && !state.distrito ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    options={Dis}
                                    onClickCapture={(e) =>
                                        Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === state.canton)))}
                                    placeholder="Distrito"
                                    onChange={(e) =>
                                        setState({ ...state, distrito: e.target.value })
                                    }
                                    optionLabel="name"
                                    optionValue="code"
                                    style={{ width: 'auto' }} />
                            </div>
                            {props.Requerido && !state.distrito && <small className="p-error">{msjRequeridos}</small>}
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
                            ref={inputRefs[5]}
                            onKeyDown={(event) => compoSiguente(event, 5)}
                            className={props.Requerido && !state.direccion ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                            value={state.direccion}
                            autoResize
                            onChange={(e) =>
                                setState({ ...state, direccion: e.target.value })}
                            rows={1}
                            style={{ transform: 'translateX(5px)', width: '98%' }} />
                    </div>
                    {props.Requerido && !state.direccion && <small className="p-error">{msjRequeridos}</small>}
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
                            className={props.Requerido && !state.sexo ? 'p-invalid' : "p-inputtext-sm block mb-2"}
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
                            className={props.Requerido && !state.sexo ? 'p-invalid' : "p-inputtext-sm block mb-2"}
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
                {props.Requerido && !state.sexo && <small className="p-error">{msjRequeridos}</small>}
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Lugar de nacimiento:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                name="lugarnacimiento"
                                id="lugarnacimiento"
                                className={props.Requerido && !state.lugarnacimiento ? 'p-invalid' : "p-inputtext-sm block mb-2"}
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
                        {props.Requerido && !state.lugarnacimiento && <small className="p-error">{msjRequeridos}</small>}
                    </div>
                    <div className="col-sm">
                        <label><b>Estado civil:</b></label>
                        <div>
                            <Dropdown
                                inputId="dropdown"
                                className={props.Requerido && !state.estadoCivil ? 'p-invalid' : "p-inputtext-sm block mb-2"}
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
                        {props.Requerido && !state.estadoCivil && <small className="p-error">{msjRequeridos}</small>}
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
                        <label><b>Correo electrónico:</b></label>
                        <div>
                            <InputText
                                id="Correo"
                                ref={inputRefs[6]}
                                onKeyDown={(event) => compoSiguente(event, 6)}
                                className={!correovalido && stateCon.cElectronico ? 'p-invalid' : ''}
                                style={{ width: '75%' }}
                                value={stateCon.cElectronico}
                                keyfilter={/[^\s]/}
                                onChange={(e) =>
                                    setStateCon({
                                        ...stateCon, cElectronico: e.target.value,
                                    })}
                                required />
                        </div>
                        {!correovalido && stateCon.cElectronico && <small className="p-error">{msjAdCorreo}</small>}
                    </div>
                    <div className="col-sm">
                        <label><b>Número de teléfono:</b></label>
                        <div>
                            <InputText
                                id="telefono"
                                ref={inputRefs[7]}
                                onKeyDown={(event) => compoSiguente(event, 7)}
                                className={props.Requerido && !stateCon.numTelefono ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                value={stateCon.numTelefono}
                                keyfilter="num"
                                style={{ width: '40%' }}
                                onChange={(e) =>
                                    setStateCon({
                                        ...stateCon, numTelefono: e.target.value,
                                    })}
                                required />
                        </div>
                        {props.Requerido && !stateCon.numTelefono && <small className="p-error">{msjRequeridos}</small>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export function InfoProfesor(props) {
    const [state, setState] = useContext(infoProfesores);
    const [stateCon, setStateCon] = useContext(infoContacto);
    const [value2, setValue2] = useState('');
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [Institucion, setInstitucion] = useState([]);
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const toast1 = useRef(null);
    const [loading2, setLoading2] = useState(false);

    const [isLoading, setLoading] = useState(true);

    const [isListo, setListo] = useState(true);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        console.log("Hola ")
        const obtenerIns = async () => {
            console.log("Hola 2 ")
            const res = await ObtenerInstitucion();
            console.log("Hola 3 ", res)
            setInstitucion(res);
        }
        obtenerIns();
        console.log("Perfil", state.Perfil)
        console.log("Error ", state.Error)
    }, []);


    const escolaridad = [
        { name: 'Bachillerato' },
        { name: 'Bachillerato Universitario' },
        { name: 'Licenciatura' },
        { name: 'Maestría', code: 'Maestría' },
        { name: 'Doctorado' }
    ];

    //Mensaje de confirmacion y efecto de carga del boton de guardar
    const accept = () => {
        toast1.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted ha aceptado', life: 3000 });
        agregarPersona({ state: state, setState: setState });
        agregarFun({ state: state, setState: setState });
        agregarContacto({ cedula: state.cedula, tCotacto: "Teléfono", contacto: stateCon.numTelefono })
        agregarContacto({ cedula: state.cedula, tCotacto: "Correo", contacto: stateCon.cElectronico })
        //handleSubmit();
        onLoadingClick2();
    }

    const reject = () => {
        toast1.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
    }
    const confirm1 = () => {
        props.Setrequerido({ ...props.Requerido, requerido: true })
        //console.log("Datos faltantes ",validar(state,stateCon));
        if (state.cedula && state.fechNac && state.pNombre && state.sNombre && state.pApellido && state.sApellido && state.provincia
            && state.canton && state.distrito && state.direccion && state.sexo && state.lugarnacimiento && state.estadoCivil
            && state.Nescolar && state.fechIng && state.lugarTrabajo && state.Atrabajo && state.descrip && stateCon.numTelefono && stateCon.cElectronico) {
            confirmDialog({
                message: 'Estas seguro que deseas continuar?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                accept,
                reject,
                acceptLabel: "Sí",
                rejectLabel: "No"
            });
        } else {
            toast1.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Faltan datos por llenar', life: 3000 });
        }
    };
    const onLoadingClick2 = () => {
        setLoading2(true);

        setTimeout(() => {
            setLoading2(false);
        }, 2000);
    }

    const handleChange = (event) => {
        const selectedImage = event.target.files[0];
        const newFile = new File([selectedImage], state.cedula + '-' + selectedImage.name, { type: selectedImage.type });
        console.log("SELECCIONADA", newFile.name)
        setImage(newFile);
        setImageUrl(URL.createObjectURL(selectedImage));
        console.log("IMAGEN 2", imageUrl)
    }
    /*Suir al server la imagen */
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('cedula', state.cedula);
        axios.post('http://localhost:3000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
        })
            .catch(error => {
                Swal.fire('Error', '');
                console.error(error);
            });
    }

    useEffect(() => {
        console.log("Cedula ", state.cedula)
        if (state.Error !== 'Error' && state.cedula > 1) {
            axios.get('http://localhost:3000/ImagenFuncionario/' + state.cedula, { responseType: 'blob' })
                .then((response) => {
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageUrl(imageUrl);
                });
        }
    }, [state.cedula]);


    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

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
                                className={props.Requerido && !state.Nescolar ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                name="Nivel escolar"
                                id="Nivelescolar"
                                value={state.Nescolar}
                                options={escolaridad}
                                placeholder="Nivel escolar"
                                required
                                style={{ width: '100%' }}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        Nescolar: e.target.value,
                                    })
                                }
                                optionLabel="name"
                                optionValue="name" />
                        </div>
                        {props.Requerido && !state.Nescolar && <small className="p-error">{msjRequeridos}</small>}
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Fecha de ingreso a la institución:</b></label>{" "}
                        <div className="field col-12 md:col-4 p-float-label">
                            <Calendar
                                className={props.Requerido && !state.fechIng ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                inputId="calendar"
                                id="fingreso"
                                dateFormat="dd-mm-yy"
                                locale="es"
                                required
                                showIcon
                                value={new Date(state.fechIng)}
                                onChange={(e) =>
                                    setState({ ...state, fechIng: e.value.toLocaleDateString('en-ZA') })} />

                        </div>
                        {props.Requerido && !state.fechIng && <small className="p-error">{msjRequeridos}</small>}
                    </div>
                    <div className="col-sm">
                        <label><b>Materias a impartir:</b></label>{" "}
                        <div className="">
                            <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" display="chip"
                                placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
                        </div>
                    </div>
                </div>
                <Divider align="left" ></Divider>
                <div className="row">
                    <div className="col-sm">
                        <label><b>Lugar de trabajo:</b></label>{" "}
                        <div className="">
                            <Dropdown
                                inputId="dropdown"
                                name="lugarTrabajo"
                                id="lugarTrabajo"
                                className={props.Requerido && !state.lugarTrabajo ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                value={state.lugarTrabajo}
                                placeholder="Lugar de Trabajo"
                                options={Institucion}
                                style={{ width: '100%' }}
                                onChange={(e) =>
                                    setState({ ...state, lugarTrabajo: e.target.value, })}
                                optionLabel="Institucion"
                                optionValue="Institucion" />
                        </div>
                        {props.Requerido && !state.lugarTrabajo && <small className="p-error">{msjRequeridos}</small>}
                    </div>
                    <div className="col-sm">
                        <div className="field">
                            <label><b>Experiencia laboral:</b></label>{" "}
                            <div>
                                <InputText
                                    id="experiencia"
                                    className={props.Requerido && !state.Atrabajo ? 'p-invalid' : "p-inputtext-sm block mb-2"}
                                    keyfilter="num"
                                    style={{ width: '100%' }}
                                    value={state.Atrabajo}
                                    placeholder="Años laborados"
                                    onChange={(e) =>
                                        setState({ ...state, Atrabajo: e.target.value })}
                                    required />
                            </div>
                            {props.Requerido && !state.Atrabajo && <small className="p-error">{msjRequeridos}</small>}
                        </div>
                    </div>
                </div>
                {/*  <Divider align="left" ></Divider>
                <div className="row">
                    
                        <label style={{ width: '100%' }}><b>Información adicional:</b></label>{" "}
                        <div>
                            <InputTextarea
                                id="descrpcion"
                                value={state.descrip}
                                className={props.Requerido && !state.descrip ? 'p-invalid'  : "p-inputtext-sm block mb-2"}
                                autoResize
                                onChange={(e) =>
                                    setState({ ...state, descrip: e.target.value })}
                                rows={5}
                                style={{ transform: 'translateX(5px)', width: '98%' }} />
                        </div>
                        {props.Requerido && !state.descrip && <small className="p-error">{msjRequeridos}</small>}
                    
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
                                            style={{ borderRadius: "100%", border: '5px solid rgb(212, 175, 55, 1)' }} width={'30%'} />}
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
                </div>*/}
                <div className="row">
                    <div className="col-sm">
                        <ConfirmDialog />
                        { /*<Button label="Guardar" icon="pi pi-save" style={{ backgroundColor: '#00939C' }} loading={loading2} onClick={confirm1} className="mr-2" />
                    */}</div>
                </div>
            </div>
        </div>

    );
}