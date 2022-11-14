/* eslint-disable array-callback-return */
import axios from 'axios';
import Swal from 'sweetalert2';


export const ObtenerEncargado = async(props)=>{ 
    try{
        console.log("Datos en "+props.cedula+" y "+props.idEncar)
        //+props.state.cedula+ +props.state.idEncar
       await axios.get('http://localhost:3000/obtenerEncargado/'+props.cedula+'/'+props.idEncar).then(res =>{
        console.log("Datos en Encargado");
        console.log(res.data[1]);

            res.data[1].map(dep => { 
                if(dep.cedula === null){
                    Swal.fire('Error', 'El encargado no se encuentra registrado');
                }else{
                    props.setState({...props.state, cedula: dep.cedula,
                        ...props.state, fechNac: dep.fechNaci,
                        ...props.state, pNombre: dep.pNombre,
                        ...props.state, sNombre: dep.sNombre,
                        ...props.state, pApellido: dep.pApellido,
                        ...props.state, sApellido: dep.sApellido,
                        ...props.state, provincia: dep.provincia,
                        ...props.state, canton: dep.canton,
                        ...props.state, distrito: dep.distrito,
                        ...props.state, sexo: dep.sexo,
                        ...props.state, lugarnacimiento: dep.nacionalidad,
                        ...props.state, lTrabajo: dep.lugarTrabajo,
                        ...props.state, ocupacion: dep.ocupacion,
                        ...props.state, estadoCivil: dep.estCivil,
                        ...props.state, parentesco: dep.parentezco,
                        ...props.state, escolaridad: dep.escolaridad,
                        ...props.state, viveEST: dep.viveCEstu
                   }); 
                }    
           })
        })
    }catch(e){
    console.log(e);
    }
}


export const ObtenerContEncargado = async (props)=>{ 
  
    try{
        await axios.get('http://localhost:3000/obtenerContacto/'+props.idEncar).then(res =>{
            console.log("Datos en contacto ");
        console.log( res.data);
             props.setState({...props.state, numTelefono: res.data[0].contacto,
                             ...props.state, cElectronico: res.data[1].contacto})
       
        })
    }catch(e){
    console.log(e);
    }
}

