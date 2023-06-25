import { differenceInYears, differenceInMonths, differenceInDays, format } from 'date-fns';

export const crearObjetoDocumentoMatri = (dtEst, dtEnc) =>{
    console.log("data", dtEst, dtEnc);



     let objeto = {
        nombreE: "",
        edad: "", cedulaE: "",
        sexoE: "", fechaNaciE: "",
        adecuacion: "", distritoE: "",
        direccionE: "", viaja: "",
        acompaniante:[], poliza: "",
        imas: "", fechaVencePoliza: "",
        pNombreM: "", sNombreM: "",
        pApellidoM: "", sApellidoM: "", 
        lugarNacimientoM: "", cedulaM: "",
        lugarTrabajoM: "", viveConEstuM: "",
        telefonoM: "", direccionM: "",
        estadoCivilM: "", escolaridadM: "",
        ocupacionM: "", parentescoM: "",
        pNombreP: "", sNombreP: "",
        pApellidoP: "", sApellidoP: "", 
        lugarNacimientoP: "", cedulaP: "",
        lugarTrabajoP: "", viveConEstuP: "",
        telefonoP: "", direccionP: "",
        estadoCivilP: "", escolaridadP: "",
        ocupacionP: "", parentescoP: ""
    } 
    
    objeto.nombreE = dtEst.pNombre + " " + ("sNombre" in dtEst ? dtEst.sNombre + " ": "") + dtEst.pApellido + " " + dtEst.sApellido;
    objeto.edad = calcularEdad(dtEst.fechaNaci);
    objeto.cedulaE = dtEst.cedula;
    objeto.sexoE = dtEst.sexo === "M"? "Hombre": "Mujer";
    objeto.fechaNaciE = formatoFecha(dtEst.fechaNaci);

    console.log("Objeto", objeto);
}

const calcularEdad = (fecha) => {
    const fechaHoy = new Date();
    const fechaNaci = new Date(fecha);
    const anios = differenceInYears(fechaHoy, fechaNaci);
    const meses = differenceInMonths(fechaHoy, fechaNaci) % 12;
    const dias = differenceInDays(fechaHoy, fechaNaci) % 30;

    return anios + " años, " + meses + (meses > 1 ? " meses y " : " mes y ") + dias + (dias > 1 ? " días" : " día") ;
};

const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    return format(date, 'dd/MM/yyyy');
  };