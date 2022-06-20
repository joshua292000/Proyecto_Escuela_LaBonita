import { ButtonSiguiente, TXT_info, dt_Fechanacimiento,InfoPersonal } from "../Componentes/Utils";
import { Button } from 'primereact/button';
import {AgregarInfoPersonal} from "../Persistencia/InsertarInfoPer";

export default function Inicio() {
    return (
      <div>
        <h1>Información personal del estudiante</h1>
        <InfoPersonal/>
     
        <button type="button" onClick={AgregarInfoPersonal}></button><br />
      </div> 
    );
  }

  //<ButtonSiguiente dir="informacionencargado" nom="Siguiente" css="button_Siguiente"/>