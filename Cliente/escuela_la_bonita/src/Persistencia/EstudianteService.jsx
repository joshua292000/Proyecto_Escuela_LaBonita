/* eslint-disable array-callback-return */
import axios from 'axios';
import Swal from 'sweetalert2';
import { msjErrorServidor } from '../Componentes/Utils';

export const agregarEstudiante = async (props)=>{
  try{
    console.log("Estudiante");
    const res = await axios.post('http://localhost:3000/insertarEstudiante', props);
      console.log(res.data); 
      if(res.data[0].error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
        console.log("error", res.data[0].error);
        return 'Error'
        
      }
      return null;

  }catch(error){
    //captura errores como de conxion al servidor. Error 404 
    return msjErrorServidor;
  }
    

 }

  export const agregarEncargadoEstudiante = async (props) =>{ 
    try {
      console.log("EncagadoEst")
      const res = await axios.post('http://localhost:3000/insertarEncargadoEst', props);
        console.log(res.data); 
        if(res.data[0].error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          console.log("error", res.data[0].error);
          return 'Error'
          
        }
        return null;
    } catch (error) {
      //captura errores como de conxion al servidor. Error 404 
      return msjErrorServidor;
    }
      

  }

  export const agregarViajaCon = async (props) =>{ 
    try {
      console.log("Viaja Con")
      const res = await axios.post('http://localhost:3000/insertarViajaCon', props);
        console.log(res.data); 
        if(res.data[0].error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          console.log("error", res.data[0].error);
          return 'Error'
          
        }
        return null;
    } catch (error) {
      //captura errores como de conxion al servidor. Error 404 
      return msjErrorServidor;
    }
      
  }

  export const ObtenerEstudiante= async (props) => { 
    console.log(props)
    const res = await axios.get('http://localhost:3000/obtenerEstudiante/'+props)
    
    if(res.data.length > 0){
      console.log("data",res.data);
      return res.data[0];
    }else{
      return null;
    }          
  }    
         
  export const ObtenerViajaCon= async (props) => { 
    console.log(props)
    try{
      const res = await axios.get('http://localhost:3000/obtenerViajaCon/'+props)
      console.log(res.data[0])
      return res.data[0]; 
    }catch(e){
      console.log(e);
      }
           
  }

  export const ObtenerPersonasViajaCon= async (props) => { 
    console.log(props)
    try{
      const res = await axios.get('http://localhost:3000/ObtenerPersonasViajaCon/'+props)
      console.log(res.data)
      return res.data; 
    }catch(e){
      console.log(e);
      }
           
  }