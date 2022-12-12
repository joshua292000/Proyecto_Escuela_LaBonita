import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { infoEncargado} from "../AppContext/providerInfoEncargado";
import { Button } from 'primereact/button';


export function ButtonSiguiente(props) {
  const [state, setState] = useContext(infoEncargado);
  const navegar = useNavigate();
  const acciones = () => {
    navegar("/" + props.dir);
  };

  return (
    <div >
          <Button  icon={props.icono} className="p-button-sm p-button-rounded p-button-info" onClick={acciones}/>
      <br />
    </div>
  );
}