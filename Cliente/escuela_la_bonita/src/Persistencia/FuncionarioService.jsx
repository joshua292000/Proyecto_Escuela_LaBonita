import axios from 'axios';
import Swal from 'sweetalert2';
import Json from '../Componentes/Globales'
import Cookies from "universal-cookie";
const json = Json;
const cookies = new Cookies();

export const Obtener_Secciones = async (props) => {
    try {
      await axios
        .get("http://localhost:3000/Constancia/" + cookies.get('Func_Id'))
        .then((res) => {
          if (res.data.length >0) {
            console.log("metodo ", res.data)
            return res.data;
          } else {
            Swal.fire('Error', 'Usuario o contraseña incorrectas');
          }
        });
    } catch (e) {
      console.log(e);
    }
  };