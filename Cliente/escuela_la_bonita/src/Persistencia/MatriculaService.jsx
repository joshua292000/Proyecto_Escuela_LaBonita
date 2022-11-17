
import Swal from 'sweetalert2';
import { agregarInfoPersonal } from './PersonaServive';
import { agregarEncargadoEstudiante, agregarEst } from './EstudianteService';
import Json from '../Componentes/Globales'
const json = Json;

export  function Matricula(propstEst, propsEnc) {
    console.log( "Datooooooosss");
    console.log( propstEst.valueEst);
    console.log( propsEnc.valueEnc);
    //Se valida si ocurrio un error al momento de realizar las inserciones de datos.
    agregarInfoPersonal({value : propstEst.valueEst});//se le pasa todo el contexto con la info, información del estudiante
    agregarInfoPersonal({value : propsEnc.valueEnc});//se le pasa todo el contexto con la info, informacion del encargado
    agregarEst({value : propstEst.valueEst});//se pasa el contexto de estudiante para guardar la info de matricula
    agregarEncargadoEstudiante({valueEnc: propsEnc.valueEnc.cedula},{valueEst: propstEst.valueEst.cedula});//se le pasa la cedula de encargado y estudiante

    Swal.fire('Felicidades', 'La matricula se creo con éxito');   
    console.log(json);
    
}