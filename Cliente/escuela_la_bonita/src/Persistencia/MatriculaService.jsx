
import { agregarInfoPersonal, agregarContactoPersona } from './PersonaServive';
import { agregarEncargadoEstudiante, agregarEstudiante, agregarViajaCon } from './EstudianteService';
import { agregarEncargado } from './EncargadoService';


export const Matricula = async (propsEst, propsEnc) => {
    let respuesta;
    respuesta = await agregarInfoPersonal(propsEst);//se le pasa todo el contexto con la infomación del estudiante para guadar en la BD
    if(respuesta === null){
        respuesta = await agregarEstudiante(propsEst);//se pasa el contexto de estudiante para guardar la info de matricula
        if(respuesta === null){
            for(let i=0; i < propsEnc.length; i++){
                respuesta = await agregarInfoPersonal(propsEnc[i]);//se le pasa todo el contexto con la informacion del encargado para guardar en la BD
                if(respuesta === null){
                    respuesta = await agregarEncargado(propsEnc[i]);
                    if(respuesta === null){
                        //agregarEncargadoEstudiante({valueEnc: propsEnc.valueEnc.cedula},{valueEst: propstEst.valueEst.cedula});//se le pasa la cedula de encargado y estudiante
                        if("correo" in propsEnc[i]){
                            respuesta = await agregarContactoPersona({cedulaPer: propsEnc[i].cedula, tipoContacto: 'Correo', contacto: propsEnc[i].correo})
                        }
                        if(respuesta === null){

                            if("telefono" in propsEnc[i]){
                            respuesta = await agregarContactoPersona({cedulaPer: propsEnc[i].cedula, tipoContacto: 'Telefono', contacto: propsEnc[i].telefono})
                            }

                            if(respuesta === null){
                                respuesta = await agregarEncargadoEstudiante({cedulaEncar: propsEnc[i].cedula, cedulaEst: propsEst.cedula, estado: propsEnc[i].estado});//se le pasa la cedula de encargado y estudiante
                                if(respuesta !== null){
                                    return respuesta
                                }
                            }else return respuesta

                        }else return respuesta
                       
                    }else return respuesta

                }else return respuesta
            }
            if(propsEst.acompaniante.length > 0){
                for(let i=0; i < propsEst.acompaniante.length; i++){
                    if(respuesta === null){
                        console.log("ciclo " + i);
                        respuesta = await agregarViajaCon(propsEst.acompaniante[i]);
                    }else{
                        return respuesta;
                    }
                }
                
            }
            //Se ingresaron todos los datos bien.
            return respuesta;

        }else return respuesta

    }else return respuesta
    
}