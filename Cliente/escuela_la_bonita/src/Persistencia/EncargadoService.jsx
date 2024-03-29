/* eslint-disable array-callback-return */
import axios from 'axios';
import { msjErrorServidor } from '../Componentes/Utils';
import Swal from 'sweetalert2';

export const agregarEncargado = async(props) => {
    try {
        console.log("AgregarEncargado");
        const res = await axios.post('http://localhost:3000/insertarEncargado', props);
        console.log(res.data); 
        if(res.data[0].error !== null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
            console.log("error", res.data[0].error);
            return 'Error'
        }
        return null;
        
    } catch (error) {
        //captura errores como de conxion al servidor. Error 404 
        return msjErrorServidor;
    }
   

    
}
  

export const ObtenerEncargado = async(props)=>{ 
    console.log("param", props)
    try{
       const res = await axios.get('http://localhost:3000/obtenerEncargado/'+props);
        console.log("Res",res.data[0]);
  
        return res.data[0];
         
     }catch(e){
    console.log(e);
    }
}

export const ObtenerEncargadosEstu = async(props)=>{ 
    try{
       const res = await axios.get('http://localhost:3000/ObtenerEncargadosXidEst/'+props.idEst)
        //console.log("Res",res.data);
       return res.data;       
     }catch(e){
    console.log(e);
    }
}


export const ObtenerContEncargado = async (props)=>{ 
  
    try{
        await axios.get('http://localhost:3000/obtenerConEncargado/'+props.idEncar).then(res =>{
            console.log("Datos en contacto ");
        console.log( res.data);
             props.setState({...props.state, numTelefono: res.data[0].contacto,
                             ...props.state, cElectronico: res.data[1].contacto})
       
        })
    }catch(e){
    console.log(e);
    }

}

export const Obtener_Actividades_Diarias = async () => {
    try {
         const res = await axios
        .get("http://localhost:3000/Encargados/ActividadesDiarias")
          if (res.data.length >0) {
            return res.data;
          } else {
            Swal.fire('Error', 'No se pudieron obtener las activades');
          }
        
    } catch (e) {
      console.log(e);
    }
  };

 

  