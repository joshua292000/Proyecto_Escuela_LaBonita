import axios from 'axios';
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

  export const agregarSeccionEstudiante = async (props) =>{ 
    try {
      console.log("Seccion")
      const res = await axios.post('http://localhost:3000/asignarSeccionEstudiante', props);
        console.log(res.data); 
        if(res.data[0].error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          console.log("error", res.data[0].error);
          return 'Se produjo un problema al insertar los datos';
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

  export const ObtenerEstudianteGrado = async (props) => {
    //Obtiene todos los alumnos de un grado
    console.log("grado: "+ props);
    try {
      const res = await axios.get("http://localhost:3000/ObtenerEstudianteGrado/"+props);
      console.log(res.data);
      if (res.data.length > 0) {
        return res.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };



  //Varas del funcionarios

  export const ObtenerFunAsigSeccion = async () => {
    //Obtiene todos los funcionarios activos para asignarles sección
    try {
      const res = await axios.get("http://localhost:3000/obtenerFunAsigSeccion");
      if (res.data.length > 0) {
        return res.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  export const ObtenerGradosSeccion = async () => {
    //Obtiene todos los grados con sus secciones del año actual
    try {
      const res = await axios.get("http://localhost:3000/obtenerGradoSeccion");
      if (res.data.length > 0) {
        return res.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  export const EliminarSecFuncionario = async (props) => {
    //se eliminan las secciones que tenga asignadas un funcionario para reinsergartarlas de nuevo
    try {
      console.log("EliminarFun" + props);
      const res = await axios.delete("http://localhost:3000/eliminarSecFuncionario/"+props);
      console.log(res.data); 
        return null;
    } catch (e) {
      //captura errores como de conxion al servidor. Error 404 
      return msjErrorServidor;
    }
  };


  export const AgregarSecFuncionario = async (props) =>{ 
    try {
      console.log("SecFuncionario", props)
      const res = await axios.post('http://localhost:3000/insertarSecFun', props);
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