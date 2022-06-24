import axios from 'axios';
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
                   return res.data;   
           })
           .then(err=> {console.log(err)})
         }