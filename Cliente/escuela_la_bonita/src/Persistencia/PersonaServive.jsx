/* eslint-disable array-callback-return */
import axios from 'axios';
import Swal from 'sweetalert2';
import Json from '../Componentes/Globales'
const json = Json;

export const agregarInfoPersonal = async(props) => {
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
     try{
      await axios.post('http://localhost:3000/insertarPersona', infop).then(res =>{
            console.log( res.data);
            res.data[1].map((dep)=>{ //se mapea la respuesta del servidor
              if(dep.error != null){//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
                Swal.fire('Error', dep.error);//se muestra el error en pantalla
              }
              json.insertPersoError = dep.error;
            })

     })

     }catch(e){
       console.log(e);

     }
    
  }
