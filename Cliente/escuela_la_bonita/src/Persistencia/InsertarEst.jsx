import axios from 'axios';
import Swal from 'sweetalert2';


export  function AgregarEst(props){
 
   var infop = {
    huellaDigi: "123456789",
    viaja: props.value.viaje,
    poliza: props.value.poliza,
    fecVenPoliza: "2023-10-10",
    imas: "S",
    cedulaPer: props.value.cedula,
    seccion: props.value.Grado,

    }
    console.log(infop)
    axios.post('http://localhost:3000/insertarEstudiante', infop).then(res =>{
            
            console.log(infop)
    })
    .then(err=> {console.log(err)})
  }