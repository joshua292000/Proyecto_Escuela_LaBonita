import { ButtonSiguiente} from "../Componentes/Utils";
import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { InfoPersonal } from "../Componentes/InfoPersEstu";
import "../Estilos.css";

export default function Inicio() {
  const [state, setState] = useContext(infoEstudiante);
    return (
      <div className="Div">
        <InfoPersonal setState={setState} state ={state} quien="estudiante"/>
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
        <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente" enc="" idEncar={state.idEncargado}/> 
       
      </div> 
    );
  }
