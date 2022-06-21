import {AgregarInfoPersonal} from "../Persistencia/InsertarInfoPer";
import { AgregarEst } from "./InsertarEst";
import { useContext } from "react";
import { AppContext } from "../AppContext/provider";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import Swal from 'sweetalert2';

export default function Matricula(propstest, propsper) {
    //const [state, setState] = useContext(AppContext);
    //const [state1, setState1] = useContext(infoEstudiante);
    console.log("prueba: "+ propsper.valueper.cedula)
    console.log("prueba2: "+ propsper.valueper.fechNac)
    console.log("prueba3: "+ propsper.valueper.pNombre)
    console.log("prueba4: "+ propsper.valueper.sNombre)
    console.log("prueba5: "+ propsper.valueper.pApellido)
    console.log("prueba6: "+ propsper.valueper.sApellido)
    console.log("prueba7: "+ propsper.valueper.Provincia)
    console.log("prueba8: "+ propsper.valueper.Canton)
    console.log("prueba9: "+ propsper.valueper.Distrito)
    console.log("prueba10: "+ propsper.valueper.sexo)
    console.log("prueba11: "+ propsper.valueper.lugarnacimiento)
    console.log("Estudiante: ")
    console.log("prueba12: "+ propstest.valueest.Grado)
    console.log("prueba13: "+ propstest.valueest.Adecuacion)
    console.log("prueba14: "+ propstest.valueest.viaje)
    console.log("prueba15: "+ propstest.valueest.Acompanante)
    console.log("prueba16: "+ propstest.valueest.poliza)
    console.log("prueba17: "+ propstest.valueest.lugarnacimiento)
    //AgregarInfoPersonal({value : propsper.valueper});
   // AgregarEst({value : propstest.valueest});
    Swal.fire('Felicidades', 'La matricula se creo con éxito')
    
}