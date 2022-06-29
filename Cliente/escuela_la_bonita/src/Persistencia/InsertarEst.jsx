import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


export  function agregarEst(props){
        console.log(props.value);
 //falta ingresar unas varas en interfas.
   var infop = {
    huellaDigi: "123456789",
    viaja: props.value.viaja,
    poliza: props.value.poliza,
    fecVenPoliza: "2023-10-10",
    imas: "S",
    cedulaPer: props.value.cedula,
    seccion: props.value.Grado
    }
    console.log(infop)

    try{
        axios.post('http://localhost:3000/insertarEstudiante', infop).then(res =>{
                console.log("Estudiante insertado");  
        });
      
  
      }catch(e){
        console.log(e);
  
      }
  }

  export  function agregarEncargadoEstudiante(propsEnc, propsEst){ 
    var infop = {
          cedulaEncar : propsEnc.valueEnc.cedula,
          cedulaEst : propsEst.valueEst.cedula
      }
      console.log(infop)
      axios.post('http://localhost:3000/insertarEncargado', infop).then(res =>{
          console.log(res.data);
      })
      .then(err=> {console.log(err)})
  }

 
   const ObtenerEstudiante =(props)=>{ 
    var infop = {
          cedula : props.state.cedula
      }
      console.log(infop)
       try{
         axios.post('http://localhost:3000/obtenerEstudiante', infop).then(res =>{
         props.setState({...props.state, mapEstudiante: res.data});
        console.log(res.data);
        
        

        })}catch(e){
         console.log(e);
       }

       useEffect(()=>{  
           MapEstudiante({state: props.state,
                   setState: props.setState});
         },[])

      //  useEffect(()=>{
      //   return()=>{
      //     (async()=>{
      //       axios.post('http://localhost:3000/obtenerEstudiante', infop).then(res =>{
      //         props.setState({...props.state, mapEstudiante: res.data});
      //         console.log(res.data);
      //      // mapEstudiante({state: props.state,
      //      //              setState: props.setState});

      //     }).catch(({response}) => {
  
      //       })

      //     }
      //     )();
      //   }
      //  });
            
  }   
  export default ObtenerEstudiante;   
       
    
  
    
  
  export function MapEstudiante(props){
  
        console.log("fec1111 ");
      props.state.mapEstudiante.map((dep)=>{
        console.log("fec "+ dep.Per_FechaNacimiento);
        props.setState({...props.state, fechNac: dep.Per_FechaNacimiento,
                        ...props.state, pNombre: dep.Per_PNombre,
                        ...props.state, sNombre: dep.Per_SNombre,
                        ...props.state, pApellido: dep.Per_PApellido,
                        ...props.state, sApellido: dep.Solis,
                        ...props.state, provincia: dep.Pro_Nombre,
                        ...props.state, canton: dep.Can_Nombre,
                        ...props.state, distrito: dep.Dis_Nombre,
                        ...props.state, sexo: dep.Per_Sexo,
                        ...props.state, lugarnacimiento: dep.Pais_Nombre,
                                      });
        console.log("State Data--> "+ props.state);

      })   

  }