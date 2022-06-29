import { ButtonSiguiente,InfoPersonal } from "../Componentes/Utils";
import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { agregarInfoPersonal } from "../Persistencia/InsertarInfoPer";

export default function Inicio() {
  const [state, setState] = useContext(infoEstudiante);
    return (
      <div className="Div">
        <h1>Información personal del estudiante</h1>
        <InfoPersonal setState={setState} state ={state} />
        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
         <ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/> 
       
      </div> 
    );
  }

  //<ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>
  // <button type="button" onClick={()=>AgregarInfoPersonal({value : state})}></button><br />