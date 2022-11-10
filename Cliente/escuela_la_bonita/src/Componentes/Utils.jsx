import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { infoEncargado, infoContacto} from "../AppContext/providerInfoEncargado";
import { ObtenerEncargado, ObtenerContEncargado } from "../Persistencia/EncargadoService";



export function ButtonSiguiente(props) {
  const [state, setState] = useContext(infoEncargado);
  const [state1, setState1] = useContext(infoContacto);
  const navegar = useNavigate();
  const acciones = () => {
    if("enc" in props && props.idEncar != null){

      ObtenerEncargado({state: state, setState: setState, cedula: 'null', idEncar: props.idEncar})
      ObtenerContEncargado({state: state1, setState: setState1, idEncar: props.idEncar});
    }
    navegar("/" + props.dir);
  };

  return (
    <div>
      <button type="button" className={props.css} onClick={acciones}>
        {props.nom}
      </button>
      <br />
    </div>
  );
}