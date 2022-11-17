import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { infoEncargado} from "../AppContext/providerInfoEncargado";



export function ButtonSiguiente(props) {
  const [state, setState] = useContext(infoEncargado);
  const navegar = useNavigate();
  const acciones = () => {

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