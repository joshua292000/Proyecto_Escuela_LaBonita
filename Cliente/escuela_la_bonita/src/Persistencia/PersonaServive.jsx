/* eslint-disable array-callback-return */
import axios from 'axios';
import { msjErrorServidor } from '../Componentes/Utils';

export const agregarInfoPersonal = async(props) => {
  try{
    console.log("InfoPersonal");
    const res = await axios.post('http://localhost:3000/insertarPersona', props);
    console.log(res.data[0]); 

    //se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
    if(res.data[0].error !== null){
      console.log("error", res.data[0].error);
      return "Error";
      
    }else{
      return null;
    }
        
  }catch(error){
    //captura errores como de conxion al servidor. Error 404 
    return msjErrorServidor;
  }
  
}

export const agregarContactoPersona = async(props) => {
  try{
    console.log("Contacto");
    const res =await axios.post('http://localhost:3000/insertarContacto', props);
      console.log(res.data);
      //se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción 
      if(res.data[0].error !== null){
        console.log("error", res.data[0].error);
        return 'Error'
        
      }
      return null;

  }catch(error){
    return msjErrorServidor;
  }
  
}
