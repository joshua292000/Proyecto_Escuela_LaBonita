import axios from 'axios';
import Swal from 'sweetalert2';

export  function agregarInfoPersonal(props){
  console.log(props.value);
  var estadoCivil ="";
  if('estadoCivil' in props.value){
    estadoCivil = props.value.estadoCivil;
  }else{
    estadoCivil = "S";
  }

   var infop = {
      cedula: props.value.cedula,
      pNombre: props.value.pNombre,
      sNombre: props.value.sNombre,
      pApellido:props.value.pApellido,
      sApellido: props.value.sApellido,
      fechNaci: props.value.fechNac,
      estCivil: estadoCivil,
      sexo: props.value.sexo,
      estado: "A",
      idDirec: 1,
      idNacio: 1
    }
    console.log(infop);
     try{
       axios.post('http://localhost:3000/insertarPersona', infop).then(res =>{
            Swal.fire('Felicidades', 'la información personal se creo con éxito')
            console.log("Se inserto correctamente la persona->>>" + res.data);
            //return res.data;
     })

     }catch(e){
       console.log(e);

     }
    
  }
