import axios from 'axios';
import Swal from 'sweetalert2';
import { useContext } from "react";
import { AppContext } from "../Context/provider";



export function AgregarInfoPersonal(){
    const [state, setState] = useContext(AppContext);
    var infop = {
      cedula: "111",
      pNombre: "pp",
      sNombre: "dd",
      pApellido: "gg",
      sApellido: "jj",
      fechNaci: "1990-05-01",
      estCivil: "S",
      sexo: "F",
      estado: "A",
      idDirec: 1,
      idNacio: 1
    }
    console.log(infop)
    axios.post('http://localhost:3000/insertarPersona', infop).then(res =>{
            Swal.fire('Felicidades', 'la información personal se creo con éxito')
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