import { ButtonSiguiente, TXT_info, dt_Fechanacimiento,InfoPersonal } from "../Componentes/Utils";
import { Button } from 'primereact/button';
import {AgregarInfoPersonal} from "../Persistencia/InsertarInfoPer";
import { useContext } from "react";
import { AppContext } from "../AppContext/provider";

export default function Inicio() {
  const [state, setState] = useContext(AppContext);
    return (
      <div>
        <h1>Información personal del estudiante</h1>
        <InfoPersonal/>
        
        <button type="button" onClick={()=>AgregarInfoPersonal({value : state})}></button><br />
      </div> 
    );
  }

  //<ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>