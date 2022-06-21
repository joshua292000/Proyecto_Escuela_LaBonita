import axios from 'axios';
import Swal from 'sweetalert2';




export  function AgregarInfoPersonal(props){
  console.log("prueba: "+ props.value.fechNac)

   var infop = {
      cedula: props.value.cedula,
      pNombre: props.value.pNombre,
      sNombre: props.value.sNombre,
      pApellido:props.value.pApellido,
      sApellido: props.value.sApellido,
      fechNaci: props.value.fechNac,
      estCivil: "S",
      sexo: props.value.sexo,
      estado: "A",
      idDirec: 1,
      idNacio: 1
    }
    console.log(infop)
    axios.post('http://localhost:3000/insertarPersona', infop).then(res =>{
            //Swal.fire('Felicidades', 'la información personal se creo con éxito')
            console.log(infop)
    })
    .then(err=> {console.log(err)})
  }
  
  /*var infop = {
    cedula: state.cedula,
    pNombre: state.pNombre,
    sNombre: state.sNombre,
    pApellido: state.pApellido,
    sApellido: state.sApellido,
    fechNaci: state.fechNac,
    estCivil: "S",
    sexo: state.Sexo,
    estado: "A",
    idDirec: 1,
    idNacio: 1
  }*/