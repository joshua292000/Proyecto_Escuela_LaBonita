import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { PaisService, ProvinciaService, CantonService, DistritoService } from '../AppContext/Getdireccion';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';

import {ObtenerEncargadosEstu, ObtenerEncargado  } from '../Persistencia/EncargadoService';
import { infoEstudiante } from '../AppContext/providerEstudiante';
import {infoEncargado} from '../AppContext/providerInfoEncargado';

let datosVasios = {
    canton : null,          cedula: "",         correo: "",         direccion: "",
    distrito: null,         escolaridad: "",    estadoCivil: "",    fechaNaci: "",
    lugarNacimiento: "",  lugarTrabajo: "",   ocupacion: "",      pApellido: "",
    pNombre: "",          parentesco: "",     provincia: null,       sApellido: "",   
    sNombre: "",          sexo: "",            telefono: "",       viveConEstu: ""
};

export function InfoEncargado() {

    const Distrito = new DistritoService();
    const Canton = new CantonService();
    const Provincia = new ProvinciaService();
    const Pais = new PaisService();
    const [countries, setCountries] = useState([]);
    const [pro, setProvincia] = useState([]);
    const [Can, setCanton] = useState([]);
    const [Dis, setDistrito] = useState([]);
    const Estado = [
      { name: 'Soltero',code:'S' },
      { name: 'Casado',code:'C' },
      { name: 'Unión libre',code:'U' },
      { name: 'Divorciado(a)',code:'D' },
      { name: 'Viudo(a)',code:'V' },
      { name: 'Separado(a)',code:'E'}
    ];
    const escolaridad = [
        { name: 'Ninguna' },
        { name: 'Primaria incompleta'},
        { name: 'Primaria completa'},
        { name: 'Secundaria incompleata'},
        { name: 'Secundaria completa'},
        { name: 'Técnico Profesional'},
        { name: 'Universitaria'}
      ];
     const parentesco = [
        { name: 'Madre'},
        { name: 'Padre'},
        { name: 'Hermano(a)'},
        { name: 'Abuelo(a)' },
        { name: 'Tío(a)'},
        { name: 'Madrastra'},
        { name: 'Padrastro'},
        { name: 'Encargado(a) legal'}
      ];
    const [estu] = useContext(infoEstudiante);
    const [state, setState]= useContext(infoEncargado);//almacena toda la información
    const [edit, setEdit] = useState(datosVasios);//contendrá la información que se edite o se cree
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(()=>{
         Pais.getPais().then(data => setCountries(data));
         Provincia.getProvincia().then(data => setProvincia(data));         
        const consultarEncargado =  async () =>{ 
                   
            const res =  await ObtenerEncargadosEstu ({idEst: parseInt(estu.id)});
            const data = await separarContactos(res);
            setState(data);
        }
         consultarEncargado();
    },[])

    useEffect(() => {
        if (edit.provincia) {
            Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === edit.provincia)));
            Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === edit.canton)));
        }
    }, [edit.provincia]);

    console.log("state", edit);

    const separarContactos = async (res) => {
        const contactos = await res.map((dt)=>{return dt.contactos.split("-")})
            for (var i = 0; i < res.length; i++) {
                const dt =  contactos[i];
                for(var j = 0; j< dt.length; j++ ){
                    if(!isNaN(dt[j])){
                       res[i].telefono = dt[j];
                    }else{
                        res[i].correo = dt[j];
                    }

                }  
            }
        return res;
    }

    const saveProduct = () => {
        setSubmitted(true);
        if (edit.cedula.trim()) {
            let datos = [...state];
            let editados = {...edit};
            if (edit.cedula) {
                const index = findIndexById(edit.cedula);
                if(index >= 0){
                    datos[index] = editados;
                    toast.current.show({ severity: 'success', summary: 'Actualización', detail: 'Encargado actualizado', life: 2500 });    
                }else{
                    datos.push(editados);
                    toast.current.show({ severity: 'success', summary: 'Registrado', detail: 'Encargado Registrado', life: 2500 });
                }
                 
            }else { 
                toast.current.show({ severity: 'feiled', summary: 'Registrado', detail: 'Encargado no Registrado', life: 2500 });
            }
            setState(datos);
            setProductDialog(false);
            setEdit(datosVasios);
    }
}
const findIndexById = (cd) => {
    let index = -1;
    for (let i = 0; i < state.length; i++) {
        if (state[i].cedula === cd) {
            index = i;
            break;
        }
    }

    return index;
}


const crearNuevo = () => {
    setEdit(datosVasios);
    setSubmitted(false);
    setProductDialog(true);
}

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Agregar encargado" icon="pi pi-plus" className="p-button-success mr-2" onClick={crearNuevo} />
            </React.Fragment>
        )
    }
    const editProduct = async(data) => {
        await setEdit({...data});
        setProductDialog(true);
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => { editProduct(rowData)}}
                />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  />
            </React.Fragment>
        );
    }
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...edit};
        _product[`${name}`] = val;

        setEdit(_product);
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text"  onClick={saveProduct}/>
        </React.Fragment>
    );
    return ( 
    <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable ref={dt} value={state} responsiveLayout="scroll" >  
            <Column field={"cedula"} header="Cedula" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field={"pNombre"} header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="telefono" header="Telefono" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="correo" header="Correo" sortable style={{ minWidth: '12rem' }}></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
        </div>
        <Dialog visible={productDialog} style={{ width: '800px' }} header="Datos del encargado" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog} >
            <div className="form-demo" style={{ height: 'auto' }}>
                <span className="titleBlack">Información Personal</span>
                <br />
                <div className="container" style={{ borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                    <div className="row ">
                        <div className="col-sm offset-md-2">
                            <div className="field">
                                <label><b>Cédula:</b></label>{" "}
                                <div className="p-inputgroup" style={{ width: '70%', backgroundPosition: 'center' }}>
                                    <InputText
                                        style={{ width: '30px' }}
                                        id="inputtext"
                                        keyfilter="num"
                                        className="p-inputtext-sm block mb-2"
                                        value={edit.cedula}
                                        onChange={(e) =>
                                            onInputChange(e, 'cedula')}
                                        required />
                                    <Button
                                        icon="pi pi-search"
                                        id="Buscar2"
                                        className="p-button-warning"
                                        onClick={async() => {
                                            const res = await ObtenerEncargado(edit.cedula);
                                            await setEdit({...res});
                                        }} />
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
                                        value={new Date(edit.fechaNaci)}
                                        onChange={(e) =>
                                            onInputChange(e, 'fechaNaci')}
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
                                        id="inputtext"
                                        className="p-inputtext-sm block mb-2"
                                        value={edit.pNombre}
                                        onChange={(e) =>
                                            onInputChange(e, 'pNombre')}
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
                                        id="inputtext"
                                        className="p-inputtext-sm block mb-2"
                                        value={edit.sNombre}
                                        style={{ width: '90%' }}
                                        onChange={(e) =>
                                            onInputChange(e, 'sNombre')}
                                        required />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm ">
                            <div className="field">
                                <label><b>Primer apellido:</b></label>
                                <div>
                                    <InputText
                                        id="inputtext"
                                        className="p-inputtext-sm block mb-2"
                                        value={edit.pApellido}
                                        style={{ width: '90%' }}
                                        onChange={(e) =>
                                            onInputChange(e, 'pApellido')}
                                        required />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="field">
                                <label><b>Segundo apellido:</b></label>
                                <div>
                                    <InputText
                                        id="inputtext"
                                        className="p-inputtext-sm block mb-2"
                                        value={edit.sApellido}
                                        style={{ width: '90%' }}
                                        onChange={(e) =>
                                            onInputChange(e, 'sApellido')}
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
                                    value={edit.provincia}
                                    optionValue="code"
                                    options={pro}
                                    placeholder="Provincia"
                                    onChange={(e) =>
                                        setEdit({ ...edit, provincia: e.target.value, })}
                                    optionLabel="name"
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
                                  value={edit.canton}
                                  className="p-inputtext-sm block mb-2"
                                  name="Canton"
                                  id="Canton"
                                  placeholder="Cantón"
                                  optionValue="code"
                                  options={Can}
                                  onClickCapture={(e) =>
                                      Canton.getCanton().then(data => setCanton(data.filter(data => data.pro === edit.provincia)))}
                                  onChange={(e) =>
                                      setEdit({ ...edit, canton: e.target.value })
                                  }
                                  optionLabel="name" 
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
                                    optionValue="code"
                                    value={edit.distrito}
                                    className="p-inputtext-sm block mb-2"
                                    options={Dis}
                                    onClickCapture={(e) =>
                                        Distrito.getDistrito().then(data => setDistrito(data.filter(data => data.pro === edit.canton)))}
                                    placeholder="Distrito"
                                    onChange={(e) =>
                                        setEdit({ ...edit, distrito: e.target.value })
                                    }
                                    optionLabel="name" 
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
                                className="p-inputtext-sm block mb-2"
                                value={edit.direccion}
                                onChange={(e) =>
                                    onInputChange(e, 'direccion')}
                                rows={1}
                                autoResize
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
                                checked={edit.sexo === "M"}
                                id="Hombre"
                                name="sexoEnc"
                                onChange={() =>
                                    setEdit({ ...edit, sexo: "M" })} />
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
                                checked={edit.sexo === "F"}
                                id="Mujer"
                                name="sexoEnc"
                                onChange={() =>
                                    setEdit({ ...edit, sexo: "F" })} />
                            <label
                                htmlFor="city2"
                                style={{ transform: 'translate(10px,7px)' }}>
                                <b>Mujer</b> 
                            </label>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                    <div className="row">
                        <div className="col-auto">
                            <label><b>Lugar de nacimiento:</b></label>
                            <div>
                                <Dropdown
                                   style={{ width: '100%' }}
                                    inputId="dropdown"
                                    name="lugarnacimiento"
                                    id="lugarnacimiento"
                                    className="p-inputtext-sm block mb-2"
                                    filter showClear filterBy="name"
                                    placeholder="Lugar de nacimiento"
                                    optionValue="name"
                                    optionLabel="name"
                                    value={edit.lugarNacimiento}
                                    options={countries}
                                    onChange={(e) =>
                                        onInputChange(e, 'lugarNacimiento')}
                                    />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label><b>Estado Civil:</b></label>
                            <div>
                                <Dropdown
                                    style={{ width: '100%' }}
                                    inputId="dropdown"
                                    className="p-inputtext-sm block mb-2"
                                    placeholder="Estado Civil" 
                                    name="EstadoCivil"
                                    id="EstadoCivil"
                                    optionLabel="name"
                                    optionValue="code"
                                    value={edit.estadoCivil}
                                    options={Estado}                    
                                    onChange={(e) =>
                                        onInputChange(e, 'estadoCivil')
                                    }
                                />
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
                                    id="inputtext"
                                    value={edit.correo}
                                    className="p-inputtext-sm block mb-2"
                                    style={{ width:'70%' }}
                                    keyfilter={/[^\s]/}
                                    onChange={(e) =>
                                        onInputChange(e, 'correoe')
                                    }
                                    
                                    required />
                            </div>
                        </div>
                        <div className="col-sm">
                            <label><b>Número de Teléfono:</b></label>
                            <div>
                                <InputText
                                    id="inputtext"
                                    value={edit.telefono}
                                    className="p-inputtext-sm block mb-2"
                                    keyfilter="num"
                                    style={{ width: '40%' }}
                                    onChange={(e) =>
                                        onInputChange(e, 'telefono')
                                    }
                                    required />
                            </div>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                    <div className="row">
                        <div className="col">
                            <label><b>Información Laboral:</b></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <label><b>Escolaridad:</b></label>
                            <div>
                                <Dropdown
                                    style={{ width: '100%' }}
                                    inputId="dropdown"
                                    className="p-inputtext-sm block mb-2"
                                    placeholder="Escolaridad" 
                                    name="Escolaridad"
                                    id="Escolaridad"
                                    optionLabel="name"
                                    optionValue="name"
                                    value={edit.escolaridad}
                                    options={escolaridad}                    
                                    onChange={(e) =>
                                        onInputChange(e, 'escolaridad')}
                                />
                            </div>
                        </div>
                        <div className="col-sm">
                            <label><b>Ocupación:</b></label>
                            <div>
                            <InputText
                                id="inputtext"
                                className="p-inputtext-sm block mb-2"
                                value={edit.ocupacion}
                                style={{ width: '90%' }}
                                onChange={(e) =>
                                    onInputChange(e, 'ocupacion')}
                                required />
                            </div>
                        </div>
                        <div className="col-sm">
                            <label><b>Lugar de Trabajo:</b></label>
                            <div>
                            <InputText
                                id="inputtext"
                                className="p-inputtext-sm block mb-2"
                                value={edit.lugarTrabajo}
                                style={{ width: '90%' }}
                                onChange={(e) =>
                                    onInputChange(e, 'lugarTrabajo')}
                                required />
                            </div>
                        </div>
                    </div>
                    <Divider align="left" ></Divider>
                    <div className="row">
                        <div className="col-sm">
                            <label className="pare"><b>Relación con el estudiante:</b></label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-auto ">
                            <label><b>Parentesco:</b></label>
                            <div>
                                <Dropdown
                                    style={{ width: '100%' }}
                                    inputId="dropdown"
                                    className="p-inputtext-sm block mb-2"
                                    placeholder="Parentesco" 
                                    name="Parentesco"
                                    id="Parentesco"
                                    optionLabel="name"
                                    optionValue="name"
                                    value={edit.parentesco}
                                    options={parentesco}                    
                                    onChange={(e) =>
                                        onInputChange(e, 'parentesco')}
                                />
                            </div>
                        </div>
                        <div className="col-sm ">
                            <label><b>Vive con el Estudiante: </b></label>
                            <div className="col-sm-auto col-sm-5">
                                <RadioButton
                                    inputId="viveS"
                                    value="true"
                                    checked={edit.viveConEstu === "S"}
                                    id="viveS"
                                    name="vive"
                                    onChange={() =>
                                        setEdit({ ...edit, viveConEstu: "S" })} />
                                <label
                                    htmlFor="viveS"
                                    style={{ transform: 'translate(10px,7px)' }}>
                                    <b>Si</b> 
                                </label>
                            </div>
                            <div className="col-sm-auto">
                                <RadioButton
                                    inputId="viveN"
                                    value="true"
                                    checked={edit.viveConEstu === "N"}
                                    id="No"
                                    name="vive"
                                    onChange={() =>
                                        setEdit({ ...edit, viveConEstu: "N" })} />
                                <label
                                    htmlFor="city2"
                                    style={{ transform: 'translate(10px,7px)' }}>
                                    <b>No</b> 
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
        </Dialog>
    </div>
);
   
}




/*   <div className="field">
                <label htmlFor="cedula">Cedula</label>
                <InputText id="cedula" value={product.cedula} onChange={(e) => onInputChange(e, 'cedula')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.cedula })} />
                {submitted && !product.cedula && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                {submitted && !product.nombre && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="contacto">Num teléfono</label>
                <InputText id="contacto" value={product.contacto} onChange={(e) => onInputChange(e, 'contacto')} required className={classNames({ 'p-invalid': submitted && !product.contacto })} />
                {submitted && !product.contacto && <small className="p-error">Nombre es requerido.</small>}
            </div>
            <div className="field">
                <label htmlFor="estado">Estado</label>
                <InputText id="estado" value={product.estado} onChange={(e) => onInputChange(e, 'estado')} required className={classNames({ 'p-invalid': submitted && !product.estado })} />
                {submitted && !product.estado && <small className="p-error">Nombre es requerido.</small>}
            </div>*/