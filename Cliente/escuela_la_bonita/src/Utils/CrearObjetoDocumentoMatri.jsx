import { differenceInYears, differenceInMonths, differenceInDays, format } from 'date-fns';

export const crearObjetoDocumentoMatri = async (dtEst, dtEnc) =>{
    let objeto = {};
    let datosEstu = datosEstudiante(dtEst, dtEnc);
    let datosEnc = datosEncargado(dtEnc);
    let fecha = obtenerDiaMesAnio();

    objeto = {...datosEstu, ...datosEnc, ...fecha};
    
    return objeto;
}

//retorna la edad del estudiante en años, meses y dias
const calcularEdad = (fecha) => {
    const fechaHoy = new Date();
    const fechaNaci = new Date(fecha);
    const anios = differenceInYears(fechaHoy, fechaNaci);
    const meses = differenceInMonths(fechaHoy, fechaNaci) % 12;
    const dias = differenceInDays(fechaHoy, fechaNaci) % 30;

    return anios + " años, " + meses + (meses > 1 ? " meses y " : " mes y ") + dias + (dias > 1 ? " días" : " día") ;
};

//da formato a la fecha, la pasa de yyy/MM/dd a dd/MM/yyyy
const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    return format(date, 'dd/MM/yyyy');
};

//se obtine el dia, el mes es texto y el anio
const obtenerDiaMesAnio = () =>{

    let meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];

    const fechaActual = new Date();
    // Obtener el mes actual (0-11)
    const mesActual = fechaActual.getMonth();
    // Obtener el nombre del mes actual
    const mesTexto = meses[mesActual];

    return {dia: fechaActual.getDate(), mes: mesTexto, anio: fechaActual.getFullYear()};
}

// retorna el estado civil en texto del encargado 
const estadoCivil= (estado, genero) => {
    if(genero === "M"){
        switch(estado){
            case 'S':
                return "Soltero";
            case 'C':
                return "Casado";
            case 'U':
                return "Unión libre";
            case 'D':
                return "Divorciado";
            case 'V':
                return "Viudo";
            case 'E':
                return "Separado";
            default :
                return "";
        }
    }else{
        switch(estado){
            case 'S':
                return "Soltera";
            case 'C':
                return "Casada";
            case 'U':
                return "Unión libre";
            case 'D':
                return "Divorciada";
            case 'V':
                return "Viuda";
            case 'E':
                return "Separada";
            default :
                return "";
        }
    }
}

const datosEstudiante = (dtEst, dtEnc) =>{
    let objeto = {
        nombreE: "", grado: "",
        edad: "", cedulaE: "",
        sexoE: "", fechaNaciE: "",
        adecuacion: "", distritoE: "",
        direccionE: "", viaja: "",
        acompaniante:[], poliza: "",
        imas: "", fechaVencePoliza: "",
        telefonoME: "", telefonoPE: ""
    }

    objeto.nombreE = dtEst.pNombre + " " + ("sNombre" in dtEst ? dtEst.sNombre + " ": "") + dtEst.pApellido + " " + dtEst.sApellido;
    objeto.edad = calcularEdad(dtEst.fechaNaci);
    objeto.cedulaE = dtEst.cedula;
    objeto.sexoE = dtEst.sexo === "M"? "Hombre": "Mujer";
    objeto.fechaNaciE = formatoFecha(dtEst.fechaNaci);
    objeto.adecuacion = dtEst.adecuacion;
    objeto.grado = dtEst.grado;
    objeto.distritoE = dtEst.distrito;
    objeto.viaja = dtEst.viaja === "S"? "Solo": "Acompañado";
    objeto.acompaniante = dtEst.acompaniante;
    objeto.poliza = dtEst.poliza === "S"? "Si": "No";
    objeto.fechaVencePoliza = dtEst.poliza === "S"? formatoFecha(dtEst.vencePoliza): "";
    objeto.imas = dtEst.imas === "S"? "Si": "No";
    dtEnc.forEach(obj => {
        if(obj.parentesco === "Madre"){
            objeto.telefonoME = obj.telefono;
        }
        else if(obj.parentesco === "Padre"){
            objeto.telefonoPE = obj.telefono;
        }

        if(obj.viveConEstu === "S")
            objeto.direccionE = obj.direccion;
    });
    
    return objeto;
}

//retorna un json con la informacion de los encargados
const datosEncargado = (dtEnc) =>{
    let encargado = {};
    let objeto = {nombreM: "", 
    lugarNacimientoM: "", cedulaM: "",
    lugarTrabajoM: "", viveConEstuM: "",
    telefonoM: "", direccionM: "",
    estadoCivilM: "", escolaridadM: "",
    ocupacionM: "", parentescoM: "",
    nombreP: "", 
    lugarNacimientoP: "", cedulaP: "",
    lugarTrabajoP: "", viveConEstuP: "",
    telefonoP: "", direccionP: "",
    estadoCivilP: "", escolaridadP: "",
    ocupacionP: "", parentescoP: ""
    }
    if(dtEnc.length > 1){
        for(let i =0 ; i < 2; i++){
            encargado = {...dtEnc[i]};
            if(encargado.sexo === "F"){
                objeto.nombreM = encargado.pNombre + " " + ("sNombre" in encargado ? encargado.sNombre + " ": "") + encargado.pApellido + " " + encargado.sApellido;
                objeto.lugarNacimientoM = encargado.lugarNacimiento;
                objeto.cedulaM = encargado.cedula;
                objeto.lugarTrabajoM = encargado.lugarTrabajo;
                objeto.viveConEstuM = encargado.viveConEstu === "S"? "Si": "No";
                objeto.telefonoM = encargado.telefono;
                objeto.direccionM = encargado.direccion;
                objeto.estadoCivilM = estadoCivil(encargado.estadoCivil, 'F');
                objeto.escolaridadM = encargado.escolaridad;
                objeto.ocupacionM = encargado.ocupacion;
                objeto.parentescoM = encargado.parentesco;
            }else{
                objeto.nombreP = encargado.pNombre + " " + ("sNombre" in encargado ? encargado.sNombre + " ": "") + encargado.pApellido + " " + encargado.sApellido;
                objeto.lugarNacimientoP = encargado.lugarNacimiento;
                objeto.cedulaP = encargado.cedula;
                objeto.lugarTrabajoP = encargado.lugarTrabajo;
                objeto.viveConEstuP = encargado.viveConEstu === "S"? "Si": "No";
                objeto.telefonoP = encargado.telefono;
                objeto.direccionP = encargado.direccion;
                objeto.estadoCivilP = estadoCivil(encargado.estadoCivil, 'M');
                objeto.escolaridadP = encargado.escolaridad;
                objeto.ocupacionP = encargado.ocupacion;
                objeto.parentescoP = encargado.parentesco;

            }
            encargado = {};
        }
        

    }else{
        encargado = {...dtEnc[0]};
        if(encargado.sexo === "F"){
            objeto.nombreM = encargado.pNombre + " " + ("sNombre" in encargado ? encargado.sNombre + " ": "") + encargado.pApellido + " " + encargado.sApellido;
            objeto.lugarNacimientoM = encargado.lugarNacimiento;
            objeto.cedulaM = encargado.cedula;
            objeto.lugarTrabajoM = encargado.lugarTrabajo;
            objeto.viveConEstuM = encargado.viveConEstu === "S"? "Si": "No";
            objeto.telefonoM = encargado.telefono;
            objeto.direccionM = encargado.direccion;
            objeto.estadoCivilM = estadoCivil(encargado.estadoCivil, 'F');
            objeto.escolaridadM = encargado.escolaridad;
            objeto.ocupacionM = encargado.ocupacion;
            objeto.parentescoM = encargado.parentesco;
        }else{
            objeto.nombreP = encargado.pNombre + " " + ("sNombre" in encargado ? encargado.sNombre + " ": "") + encargado.pApellido + " " + encargado.sApellido;
            objeto.lugarNacimientoP = encargado.lugarNacimiento;
            objeto.cedulaP = encargado.cedula;
            objeto.lugarTrabajoP = encargado.lugarTrabajo;
            objeto.viveConEstuP = encargado.viveConEstu === "S"? "Si": "No";
            objeto.telefonoP = encargado.telefono;
            objeto.direccionP = encargado.direccion;
            objeto.estadoCivilP = estadoCivil(encargado.estadoCivil, 'M');
            objeto.escolaridadP = encargado.escolaridad;
            objeto.ocupacionP = encargado.ocupacion;
            objeto.parentescoP = encargado.parentesco;

        }
        encargado = {};

    }
    return objeto;
}