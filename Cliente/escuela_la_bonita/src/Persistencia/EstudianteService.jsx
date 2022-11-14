/* eslint-disable array-callback-return */
import axios from 'axios';
import Swal from 'sweetalert2';
import Json from '../Componentes/Globales'
const json = Json;

export const agregarEst = async (props)=>{
        console.log(props.value);
 //falta ingresar unas varas en interfas.
   var infop = {
    huellaDigi: "123456589",
    viaja: props.value.viaja,
    poliza: props.value.poliza,
    fecVenPoliza: "2023-10-10",
    imas: "S",
    cedulaPer: props.value.cedula,
    seccion: props.value.Grado
    }
    console.log(infop)

    try{
       await axios.post('http://localhost:3000/insertarEstudiante', infop).then(res =>{
            console.log(res.data); 
            res.data[1].map((dep)=>{ //se mapea la respuesta del servidor
              if(dep.error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
                Swal.fire('Error', dep.error);//se muestra el error en pantalla
              }
              json.insertEstError = dep.error;
            })

        });
      
  
      }catch(e){
        console.log(e);
  
      }
  }

  export const agregarEncargadoEstudiante = async (propsEnc, propsEst) =>{ 
    //retornará error nulo cuando todo esta bien o el registro ya se encuentra registrado
    var infop = {
          cedulaEncar : propsEnc.valueEnc,
          cedulaEst : propsEst.valueEst
      }
      console.log(infop)
      await axios.post('http://localhost:3000/insertarEncargado', infop).then(res =>{
          console.log(res.data);
          res.data[1].map((dep)=>{ //se mapea la respuesta del servidor
            console.log("encargado name "+dep.error);
            console.log(json);
            if(dep.error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
              Swal.fire('Error', dep.error);//se muestra el error en pantalla
            }
            json.insertEncargError = dep.error;
          })
      })
      .then(err=> {console.log(err)})
  }

 
  export const ObtenerEstudiante= async (props) => { 
    console.log(props.state.cedula)
    // try{
       await axios.get('http://localhost:3000/obtenerEstudiante/'+props.state.cedula).then(res =>{
       //props.setState({...props.state, mapEstudiante: res.data});
      console.log(res.data);
      if(res.data.length === 0){
        Swal.fire('Error', 'El estudiante no se encuentra registrado');
      }else{
        // eslint-disable-next-line array-callback-return
        res.data.map((dep)=>{
          props.setState({...props.state, fechNac: dep.fechaNaci,
                          ...props.state, pNombre: dep.Per_PNombre,
                          ...props.state, sNombre: dep.Per_SNombre,
                          ...props.state, pApellido: dep.Per_PApellido,
                          ...props.state, sApellido: dep.Per_SApellido,
                          ...props.state, provincia: dep.Pro_Nombre,
                          ...props.state, canton: dep.Can_Nombre,
                          ...props.state, distrito: dep.Dis_Nombre,
                          ...props.state, direccion: dep.Dir_Direccion,
                          ...props.state, sexo: dep.Per_Sexo,
                          ...props.state, lugarnacimiento: dep.Pais_Nombre,
                          ...props.state, idEncargado: dep.Per_Id,
                          ...props.state, Grado: dep.Sec_Grado,
                          ...props.state, adecuacion: dep.Ade_Nombre,
                          ...props.state, viaja: dep.Est_Viaja,
                          ...props.state, poliza: dep.Est_Poliza
          });
        })
      }
   })           
}    
       
