import { ButtonSiguiente } from "../Componentes/Utils";
import "../style.css";

export default function Inicio() {
    return (
      <div className="Div">
        <h1>Página de inicio</h1>
        <ButtonSiguiente dir="informacionpersonal" nom="Matricula" css="button_Matricula " />
      </div>
    );
  }